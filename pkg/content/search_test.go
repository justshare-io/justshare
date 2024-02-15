package content

import (
	"fmt"
	"testing"
)

func TestSearch(t *testing.T) {
	idx, err := NewSearchIndex("/tmp/bleve")
	if err != nil {
		t.Fatal(err)
	}
	idx.IndexDocument("1", "hello world")
	idx.IndexDocument("2", "something")
	idx.IndexDocument("3", "hello apple")
	idx.IndexDocument("4", "test world")
	res, err := idx.Search("Aple")
	if err != nil {
		t.Fatal(err)
	}
	for _, hit := range res.Hits {
		fmt.Printf("%+v\n", hit)
	}
	if res.Total != 2 {
		t.Fatalf("expected 2 results, got %d", res.Total)
	}
}
