package kubes

import "testing"

func TestAddTagToImage(t *testing.T) {
	container, err := addHashToImage("ghcr.io/justshare-io/justshare")
	if err != nil {
		t.Error(err)
	}
	println(container)
}
