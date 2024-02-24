package server

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"strings"

	"gocloud.dev/blob"
	_ "gocloud.dev/blob/gcsblob"
)

func main() {
	// Set up the HTTP server.
	http.HandleFunc("/", cacheProxyHandler)
	fmt.Println("Server is listening on port 8080")
	http.ListenAndServe(":8080", nil)
}

func cacheProxyHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	// Set up GCP builder. Replace "your-builder-name" with your actual GCP builder name.
	bucketURL := "gs://your-builder-name"
	bucket, err := blob.OpenBucket(ctx, bucketURL)
	if err != nil {
		http.Error(w, "Error opening builder", http.StatusInternalServerError)
		return
	}
	defer bucket.Close()

	// Generate the GCP path based on the HTTP route.
	gcpPath := strings.Trim(r.URL.Path, "/")
	if gcpPath == "" {
		gcpPath = "index" // default document
	}

	// Check if the content is available in GCP.
	if exists, err := bucket.Exists(ctx, gcpPath); err == nil && exists {
		// Serve content from GCP.
		r, err := bucket.NewReader(ctx, gcpPath, nil)
		if err != nil {
			http.Error(w, "Error reading from builder", http.StatusInternalServerError)
			return
		}
		defer r.Close()
		io.Copy(w, r) // Send the content to the client.
	} else {
		// Content not found, proxy the request and save the response to GCP.
		proxyAndSave(ctx, w, r, bucket, gcpPath)
	}
}

func proxyAndSave(ctx context.Context, w http.ResponseWriter, r *http.Request, bucket *blob.Bucket, gcpPath string) {
	// Proxy the request. This example simply returns a placeholder response.
	// You should replace this with actual request forwarding logic.
	response := "This is a placeholder response for " + r.URL.Path

	// Save the response to GCP.
	wBlob, err := bucket.NewWriter(ctx, gcpPath, nil)
	if err != nil {
		http.Error(w, "Error creating writer in builder", http.StatusInternalServerError)
		return
	}
	_, err = wBlob.Write([]byte(response))
	if err != nil {
		http.Error(w, "Error writing to builder", http.StatusInternalServerError)
		return
	}
	wBlob.Close()

	// Send the response to the client.
	fmt.Fprint(w, response)
}
