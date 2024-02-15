# justshare

share things with people

## Overview

### Find or make a thing.
You want to share some*thing* with someone. It could be a file, a link, a note, or another thing.

### Share it with people.
You want to share it with someone. You could share it with a friend, a group of friends, or the whole world. You want to put a *thing* in a *place*. heh.

### Control who gets to see it.
You want to control who gets to see it. Just for you. Just for your friends. Just for your friends and their friends. Just for the whole world.

### Your thing is valuable.
You want to know who sees it. You want to know who likes it. You want to know who shares it. You want to know who comments on it. You want to know who makes a copy of it. You want to know who makes a derivative of it. You want to know who makes a derivative of a derivative of it. You want to know who makes a derivative of a derivative of a derivative of it. You want to know who makes a derivative of a derivative of a derivative of a derivative of it. 

## License

justshare is licensed under the Apache 2.0 license. See the `LICENSE` file for more details.

## Getting Started

To get started with justshare, follow these steps:

### Setup Repo

```shell
git clone --recursive https://github.com/justshare-io/justshare.git
```

### Running
Backend
```shell
go run main.go start --dev
```

Since the static assets are generated, you could to go to http://localhost:8000 and it should work now.

If you want to hack on the frontend, keep reading.

Frontend
```shell
npm install
npm run dev:site
```

Extension
```shell
npm run dev:extension
````

## Hacking

### Installing Golang Dependencies

Are all these right? Are there more? Someone tell me.
```shell
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```

### Generating Code
This project uses grpc to communicate between different services. To keep them in sync after making changes, run the following:
```shell
go generate -x ./...
```

## Contributing

We welcome contributions to justshare! To contribute, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## Contact

Come hang out with us on [Discord](https://discord.gg/jSWJCHCV)!
