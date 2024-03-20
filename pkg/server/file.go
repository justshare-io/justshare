package server

import (
	"encoding/json"
	"github.com/google/uuid"
	"io"
	"log/slog"
	"net/http"
	"os"
)

type UploadResponse struct {
	Id  string `json:"id"`
	Url string `json:"url"`
}

func (a *APIHTTPServer) fileUploadHandler(w http.ResponseWriter, r *http.Request) {
	writeError := func(sc int, err error, msg string, args ...any) {
		slog.Error(msg, "error", err, "args", args)
		http.Error(w, msg, sc)
	}
	if r.Method != http.MethodPost {
		writeError(http.StatusMethodNotAllowed, nil, "Invalid request method", "method", r.Method)
		return
	}

	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		writeError(http.StatusInternalServerError, err, "Error parsing multipart form")
		return
	}

	file, handler, err := r.FormFile("file")
	if err != nil {
		writeError(http.StatusInternalServerError, err, "Error retrieving the file from form data")
		return
	}
	defer file.Close()

	slog.Debug("Uploaded File", "filename", handler.Filename, "size", handler.Size, "mime", handler.Header)

	id := uuid.NewString()
	d, err := a.builder.Dir("uploads").File(id)
	if err != nil {
		writeError(http.StatusInternalServerError, err, "Error creating a directory for the uploaded file")
		return
	}

	f, err := os.Create(d)
	if err != nil {
		if os.IsExist(err) {
			writeError(http.StatusConflict, err, "File already exists", "id", id)
			return
		}
		writeError(http.StatusInternalServerError, err, "Error opening the file")
		return
	}
	defer f.Close()

	_, err = io.Copy(f, file)
	if err != nil {
		writeError(http.StatusInternalServerError, err, "Error copying the uploaded file")
		return
	}

	uploadResponse := UploadResponse{
		Id:  id,
		Url: f.Name(),
	}
	uploadResponseJson, err := json.Marshal(uploadResponse)
	if err != nil {
		writeError(http.StatusInternalServerError, err, "Error serializing the response")
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(uploadResponseJson)
}
