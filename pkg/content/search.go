package content

import "github.com/blevesearch/bleve"

type SearchIndex struct {
	Index bleve.Index
}

// TODO breadchris make sure I am using this right https://github.com/blevesearch/beer-search

func NewSearchIndex(indexPath string) (*SearchIndex, error) {
	idx, err := loadSearchIndex(indexPath)
	if err != nil {
		return nil, err
	}
	return &SearchIndex{Index: idx}, nil
}

func (s *SearchIndex) IndexDocument(id string, data any) error {
	return s.Index.Index(id, data)
}

func (s *SearchIndex) DeleteDocument(id string) error {
	return s.Index.Delete(id)
}

func (s *SearchIndex) Search(query string) (*bleve.SearchResult, error) {
	req := bleve.NewSearchRequest(bleve.NewQueryStringQuery(query))
	return s.Index.Search(req)
}

func loadSearchIndex(indexPath string) (bleve.Index, error) {
	mapping := bleve.NewIndexMapping()
	bleveIdx, err := bleve.Open(indexPath)
	if err == nil {
		return bleveIdx, nil
	}
	bleveIdx, err = bleve.New(indexPath, mapping)
	if err != nil {
		return nil, err
	}
	return bleveIdx, nil
}
