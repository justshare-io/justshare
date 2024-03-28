package signal

// This file was generated from JSON Schema using quicktype, do not modify it directly.
// To parse and unparse this JSON data, add this code to your project and do:
//
//    welcome, err := UnmarshalWelcome(bytes)
//    bytes, err = welcome.Marshal()

import "encoding/json"

type SignalMessages []SignalMessage

func UnmarshalWelcome(data []byte) (SignalMessages, error) {
	var r SignalMessages
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *SignalMessages) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type SignalMessage struct {
	Envelope Envelope `json:"envelope"`
	Account  string   `json:"account"`
}

type Envelope struct {
	Source         string          `json:"source"`
	SourceNumber   *string         `json:"sourceNumber"`
	SourceUUID     string          `json:"sourceUuid"`
	SourceName     string          `json:"sourceName"`
	SourceDevice   int64           `json:"sourceDevice"`
	Timestamp      int64           `json:"timestamp"`
	SyncMessage    *SyncMessage    `json:"syncMessage,omitempty"`
	ReceiptMessage *ReceiptMessage `json:"receiptMessage,omitempty"`
	DataMessage    *DataMessage    `json:"dataMessage,omitempty"`
}

type DataMessage struct {
	Timestamp        int64      `json:"timestamp"`
	Message          *string    `json:"message"`
	ExpiresInSeconds int64      `json:"expiresInSeconds"`
	ViewOnce         bool       `json:"viewOnce"`
	GroupInfo        *GroupInfo `json:"groupInfo,omitempty"`
}

type GroupInfo struct {
	GroupID string `json:"groupId"`
	Type    string `json:"type"`
}

type ReceiptMessage struct {
	When       int64   `json:"when"`
	IsDelivery bool    `json:"isDelivery"`
	IsRead     bool    `json:"isRead"`
	IsViewed   bool    `json:"isViewed"`
	Timestamps []int64 `json:"timestamps"`
}

type SyncMessage struct {
	BlockedNumbers  []interface{} `json:"blockedNumbers,omitempty"`
	BlockedGroupIDS []interface{} `json:"blockedGroupIds,omitempty"`
	Type            *string       `json:"type,omitempty"`
	SentMessage     *SentMessage  `json:"sentMessage,omitempty"`
	ReadMessages    []ReadMessage `json:"readMessages,omitempty"`
}

type ReadMessage struct {
	Sender       string      `json:"sender"`
	SenderNumber interface{} `json:"senderNumber"`
	SenderUUID   string      `json:"senderUuid"`
	Timestamp    int64       `json:"timestamp"`
}

type SentMessage struct {
	Destination       *string      `json:"destination"`
	DestinationNumber interface{}  `json:"destinationNumber"`
	DestinationUUID   *string      `json:"destinationUuid"`
	Timestamp         int64        `json:"timestamp"`
	Message           *string      `json:"message"`
	ExpiresInSeconds  int64        `json:"expiresInSeconds"`
	ViewOnce          bool         `json:"viewOnce"`
	Attachments       []Attachment `json:"attachments,omitempty"`
	GroupInfo         *GroupInfo   `json:"groupInfo,omitempty"`
}

type Attachment struct {
	ContentType     string      `json:"contentType"`
	Filename        string      `json:"filename"`
	ID              string      `json:"id"`
	Size            int64       `json:"size"`
	Width           int64       `json:"width"`
	Height          int64       `json:"height"`
	Caption         interface{} `json:"caption"`
	UploadTimestamp interface{} `json:"uploadTimestamp"`
}
