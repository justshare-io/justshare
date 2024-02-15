#FROM node:lts-alpine as client
#
#COPY js /build/js
#COPY package.json /build/package.json
#COPY package-lock.json /build/package-lock.json
#
#WORKDIR /build
#
#RUN npm i && npm run build

FROM --platform=linux/amd64 alpine as builder
RUN apk add --no-cache build-base go ffmpeg
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY js js
#COPY --from=client /build/js js
COPY pkg pkg
COPY main.go .

RUN go build -o justshare main.go

FROM alpine

RUN apk add --no-cache ffmpeg hugo
WORKDIR /app

# Copy the binary from the build stage
COPY --from=builder /app/justshare .

ENTRYPOINT ["./justshare"]
CMD ["start"]