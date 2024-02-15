//go:build js && wasm
// +build js,wasm

package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"strings"
	"syscall/js"

	sprig "github.com/Masterminds/sprig/v3"
	"gopkg.in/yaml.v3"
)

// NOTE: This file currently has some minor incompatibilities with Go 1.18 due
// to the introduction of the `any` type into syscall/js. Because it is
// deployed to a Google App Engine environment which only supports 1.16 at
// present, I have not upgradeded to match the changed interface. When Go 1.18
// is available on App Engine I will update this accordingly:
// https://cloud.google.com/appengine/docs/standard/go/release-notes

func main() {
	// Render provides the ability to take in a template string and input
	// data and render the corresponding output.
	render := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		if len(args) < 2 {
			return "Must provide at least two arguments: inputTmpl, inputData, [dataFormat], [enableSprig]"
		}
		inputTmpl := args[0].String()
		inputData := args[1].String()
		dataFmt := "JSON"
		if len(args) >= 3 {
			dataFmt = args[2].String()
		}
		enableSprig := false
		if len(args) >= 4 {
			enableSprig = args[3].Bool()
		}

		tmpl := template.New("base")
		if enableSprig {
			tmpl = tmpl.Funcs(sprig.FuncMap())
		}
		tmpl, err := tmpl.Parse(inputTmpl)
		if err != nil {
			return fmt.Sprintf("error parsing template: %v", err)
		}

		data, err := decode(inputData, dataFmt)
		if err != nil {
			return fmt.Sprintf("error decoding from '%s': %v", dataFmt, err)
		}

		var b strings.Builder
		if err := tmpl.Execute(&b, data); err != nil {
			return fmt.Sprintf("error executing template: %v", err)
		}

		return b.String()
	})
	js.Global().Set("ExpRenderGoTemplate", render)

	convertData := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		if len(args) != 3 {
			return "Must provide three arguments: inputData, fromFormat, toFormat"
		}
		inputData := args[0].String()
		fromFmt := args[1].String()
		toFmt := args[2].String()

		data, err := decode(inputData, fromFmt)
		if err != nil {
			return fmt.Sprintf("Error decoding from '%s': %v", fromFmt, err)
		}
		output, err := encode(data, toFmt)
		if err != nil {
			return fmt.Sprintf("Error encoding to '%s': %v", toFmt, err)
		}
		return string(output)
	})
	js.Global().Set("ExpConvertData", convertData)

	// Wait forever
	<-make(chan bool)
}

func decode(inputData, dataFmt string) (data interface{}, err error) {
	switch dataFmt {
	case "JSON":
		if err := json.Unmarshal([]byte(inputData), &data); err != nil {
			return nil, err
		}
	case "YAML":
		if err := yaml.Unmarshal([]byte(inputData), &data); err != nil {
			return nil, err
		}
	default:
		return nil, fmt.Errorf("Unknown data format: '%s'", dataFmt)
	}
	return
}

func encode(input interface{}, dataFmt string) (output []byte, err error) {
	switch dataFmt {
	case "JSON":
		// Two spaces matches default in Javascript.
		return json.MarshalIndent(input, "", "  ")
	case "YAML":
		return yaml.Marshal(input)
	default:
		return nil, fmt.Errorf("Unknown data format: '%s'", dataFmt)
	}
}
