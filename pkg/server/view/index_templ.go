// Code generated by templ - DO NOT EDIT.

// templ: version: v0.2.543
package view

//lint:file-ignore SA4006 This context is only used if a nested component is present.

import "github.com/a-h/templ"
import "context"
import "io"
import "bytes"

type Item struct {
	Name string
	Href string
}

type Feature struct {
	Name        string
	Description string
}

type Stat struct {
	Id    string
	Name  string
	Value string
}

func Page(contents templ.Component) templ.Component {
	return templ.ComponentFunc(func(ctx context.Context, templ_7745c5c3_W io.Writer) (templ_7745c5c3_Err error) {
		templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templ_7745c5c3_W.(*bytes.Buffer)
		if !templ_7745c5c3_IsBuffer {
			templ_7745c5c3_Buffer = templ.GetBuffer()
			defer templ.ReleaseBuffer(templ_7745c5c3_Buffer)
		}
		ctx = templ.InitializeContext(ctx)
		templ_7745c5c3_Var1 := templ.GetChildren(ctx)
		if templ_7745c5c3_Var1 == nil {
			templ_7745c5c3_Var1 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("<html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>justshare</title><script src=\"https://cdn.tailwindcss.com\"></script></head><body class=\"bg-gray-900\">")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		templ_7745c5c3_Err = contents.Render(ctx, templ_7745c5c3_Buffer)
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("</body></html>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		if !templ_7745c5c3_IsBuffer {
			_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteTo(templ_7745c5c3_W)
		}
		return templ_7745c5c3_Err
	})
}

func Index(feature Feature, stat Stat, item Item) templ.Component {
	return templ.ComponentFunc(func(ctx context.Context, templ_7745c5c3_W io.Writer) (templ_7745c5c3_Err error) {
		templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templ_7745c5c3_W.(*bytes.Buffer)
		if !templ_7745c5c3_IsBuffer {
			templ_7745c5c3_Buffer = templ.GetBuffer()
			defer templ.ReleaseBuffer(templ_7745c5c3_Buffer)
		}
		ctx = templ.InitializeContext(ctx)
		templ_7745c5c3_Var2 := templ.GetChildren(ctx)
		if templ_7745c5c3_Var2 == nil {
			templ_7745c5c3_Var2 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("<div class=\"bg-gray-900\"><main><div class=\"relative isolate overflow-hidden\"><svg class=\"absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]\" aria-hidden=\"true\"><defs><pattern id=\"983e3e4c-de6d-4c3f-8d64-b9761d1534cc\" style=\"width: 200px; height: 200px\" x=\"50%\" patternUnits=\"userSpaceOnUse\"><path d=\"M.5 200V.5H200\" fill=\"none\"></path></pattern></defs> <svg x=\"50%\" class=\"overflow-visible fill-gray-800/20\"><path d=\"M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z\"></path></svg> <rect width=\"100%\" height=\"100%\" fill=\"url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)\"></rect></svg><div class=\"absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]\" aria-hidden=\"true\"><div class=\"aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20\"></div></div><div class=\"mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-8 lg:pt-40\"><div class=\"mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8\"><div class=\"mt-24 sm:mt-32 lg:mt-16\"><a href=\"#\" class=\"inline-flex space-x-6\"><span class=\"rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20\">alpha</span></a></div><h1 class=\"mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl\">justshare</h1><p class=\"mt-6 text-lg leading-8 text-gray-300\">share things with people</p><div class=\"mt-10 flex items-center gap-x-6\"><a href=\"https://justshare.io/app/web\" class=\"rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400\">Get started</a> <a href=\"https://github.com/justshare-io/justshare\" class=\"text-sm font-semibold leading-6 text-white\">source code <span aria-hidden=\"true\">→</span></a></div></div><div class=\"mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32\"><div class=\"max-w-3xl flex-none sm:max-w-5xl lg:max-w-none\"></div></div></div></div><div class=\"mx-auto mt-32 max-w-7xl px-6 sm:mt-32 lg:px-8\"><div class=\"mx-auto max-w-2xl text-center\"><h2 class=\"text-base font-semibold leading-7 text-indigo-400\">Discover.</h2><p class=\"mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl\">Find or make a thing.</p><p class=\"mt-6 text-lg leading-8 text-gray-300\">You want to share something with someone. It could be a file, a link, a note, or another thing.</p></div></div><div class=\"mx-auto mt-32 max-w-7xl px-6 sm:mt-32 lg:px-8\"><div class=\"mx-auto max-w-2xl text-center\"><h2 class=\"text-base font-semibold leading-7 text-indigo-400\">Share.</h2><p class=\"mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl\">Share it with people.</p><p class=\"mt-6 text-lg leading-8 text-gray-300\">You want to share it with someone. You could share it with a friend, a group of friends, or the whole world. You want to put a thing in a place. heh.</p></div></div><div class=\"mx-auto mt-32 max-w-7xl px-6 sm:mt-32 lg:px-8\"><div class=\"mx-auto max-w-2xl text-center\"><h2 class=\"text-base font-semibold leading-7 text-indigo-400\">Protect.</h2><p class=\"mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl\">Control who gets to see it.</p><p class=\"mt-6 text-lg leading-8 text-gray-300\">You want to control who gets to see it. Just for you. Just for your friends. Just for your friends and their friends. Just for the whole world.</p></div></div><div class=\"mx-auto mt-32 max-w-7xl px-6 sm:mt-32 lg:px-8\"><div class=\"mx-auto max-w-2xl text-center\"><h2 class=\"text-base font-semibold leading-7 text-indigo-400\">Value.</h2><p class=\"mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl\">Your thing is valuable.</p><p class=\"mt-6 text-lg leading-8 text-gray-300\">You want to know who sees it. You want to know who likes it. You want to know who shares it. You want to know who comments on it. You want to know who makes a copy of it. You want to know who makes a derivative of it. You want to know who makes a derivative of a derivative of it. You want to know who makes a derivative of a derivative of a derivative of it. You want to know who makes a derivative of a derivative of a derivative of a derivative of it.</p></div></div><div class=\"relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8\"><svg class=\"absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]\" aria-hidden=\"true\"></svg><div class=\"absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl\" aria-hidden=\"true\"><div class=\"aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20\"></div></div><div class=\"mx-auto max-w-2xl text-center\"><h2 class=\"text-3xl font-bold tracking-tight text-white sm:text-4xl\">Don't think, write.</h2><p class=\"mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300\">You have cool ideas. You want to share them with people. You don't want to think about how to do it. Just share.</p><div class=\"mt-10 flex items-center justify-center gap-x-6\"><a href=\"https://justshare.io\" class=\"rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white\">Get started</a> <a href=\"https://github.com/justshare-io/justshare\" class=\"text-sm font-semibold leading-6 text-white\">Learn more <span aria-hidden=\"true\">→</span></a></div></div></div></main></div>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		if !templ_7745c5c3_IsBuffer {
			_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteTo(templ_7745c5c3_W)
		}
		return templ_7745c5c3_Err
	})
}
