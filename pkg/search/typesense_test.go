package search

import (
	"context"
	"fmt"
	"log"
	"testing"

	"github.com/typesense/typesense-go/typesense"
	"github.com/typesense/typesense-go/typesense/api"
)

var client *typesense.Client

func initializeClient() {
	client = typesense.NewClient(
		typesense.WithServer("http://localhost:8108"), // Replace with your Typesense server address
		typesense.WithAPIKey("xyz"),                   // Replace with your Typesense API key
	)
}

func ptr[U any](s U) *U {
	return &s
}

func createIndex() {
	schema := &api.CollectionSchema{
		Name: "books",
		Fields: []api.Field{
			{
				Name: "title",
				Type: "string",
			},
			{
				Name: "author",
				Type: "string",
			},
			{
				Name:  "publication_year",
				Type:  "int32",
				Facet: ptr(true),
			},
		},
		DefaultSortingField: ptr("publication_year"),
	}

	collection, err := client.Collections().Create(context.Background(), schema)
	if err != nil {
		log.Fatalf("Failed to create collection: %v", err)
	}
	fmt.Printf("Collection created: %v\n", collection)
}

func searchIndex() {
	searchParameters := &api.SearchCollectionParams{
		Q:       "harry potter",
		QueryBy: "title",
		SortBy:  ptr("publication_year:desc"),
	}

	searchResult, err := client.Collection("books").Documents().Search(context.Background(), searchParameters)
	if err != nil {
		log.Fatalf("Failed to search documents: %v", err)
	}
	fmt.Printf("Search results: %+v\n", searchResult)
}

func deleteIndex() {
	_, err := client.Collection("books").Delete(context.Background())
	if err != nil {
		log.Fatalf("Failed to delete collection: %v", err)
	}
	fmt.Println("Collection deleted")
}

func TestTypesense(t *testing.T) {
	initializeClient()
	createIndex()
	// Wait for index to be populated or perform other operations
	searchIndex()
	deleteIndex()
}
