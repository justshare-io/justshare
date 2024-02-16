package server

import (
	"fmt"
	"github.com/fsnotify/fsnotify"
	"html/template"
	"log/slog"
	"sync"
)

var (
	TemplateExt  = ".gohtml"
	TemplatePath = ".//"
)

type Reloader struct {
	Templates map[string]*template.Template

	*fsnotify.Watcher
	*sync.Mutex
}

func (r *Reloader) Get(name string) *template.Template {
	r.Lock()
	defer r.Unlock()
	if t, ok := r.Templates[name]; ok {
		return t
	}
	return nil
}

func NewReloader(dirs ...string) (*Reloader, error) {
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		return nil, err
	}

	for _, path := range dirs {
		err = watcher.Add(path)
		if err != nil {
			return nil, err
		}
	}

	return &Reloader{
		Watcher: watcher,
		Mutex:   &sync.Mutex{},
	}, nil
}

func (r *Reloader) Watch() {
	go func() {
		for {
			select {
			case event, ok := <-r.Watcher.Events:
				if !ok {
					return
				}
				slog.Debug("event:", event)
				if event.Has(fsnotify.Write) {
					slog.Debug("modified file:", event.Name)
					err := r.reload(event.Name)
					if err != nil {
						slog.Error("Error reloading file:", err)
					}
				}
			case err, ok := <-r.Watcher.Errors:
				if !ok {
					return
				}
				slog.Debug("error:", err)
			}
		}
	}()
}

func (r *Reloader) reload(name string) error {

	// Just for example purposes, and sssuming 'index.gohtml' is in the
	// same directory as this file.
	if name == TemplatePath+"reload.go" {
		return nil
	}

	if len(name) >= len(TemplateExt) &&
		name[len(name)-len(TemplateExt):] == TemplateExt {

		tmpl := template.Must(template.ParseFiles(name))

		// Gather what would be the key in our template map.
		// 'name' is in the format: "path/identifier.extension",
		// so trim the 'path/' and the '.extension' to get the
		// name (minus new extension) used inside of our map.
		key := name[len(TemplatePath) : len(name)-len(TemplateExt)]

		r.Lock()
		r.Templates[key] = tmpl
		r.Unlock()

		return nil
	}
	return fmt.Errorf("Unable to reload file %s\n", name)
}
