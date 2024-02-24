package twillio

import (
	"encoding/xml"
	"log/slog"
	"net/http"
)

type TwilioSMS struct {
	MessageSid string `form:"MessageSid"`
	Body       string `form:"Body"`
	From       string `form:"From"`
}

// TwiML response to structure your reply message
type TwiML struct {
	XMLName xml.Name `xml:"Response"`
	Message string   `xml:"Message"`
}

func handleSMS(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Only POST requests are allowed", http.StatusMethodNotAllowed)
		return
	}

	if err := r.ParseForm(); err != nil {
		http.Error(w, "Failed to parse form", http.StatusBadRequest)
		return
	}

	sms := TwilioSMS{
		MessageSid: r.PostFormValue("MessageSid"),
		Body:       r.PostFormValue("Body"),
		From:       r.PostFormValue("From"),
	}

	slog.Debug("Received a message from", "from", sms.From, "body", sms.Body)

	response := TwiML{Message: "Thank you for your message!"}
	x, err := xml.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to marshal XML", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/xml")
	w.Write(x)
}
