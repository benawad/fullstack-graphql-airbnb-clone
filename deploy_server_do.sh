#! /bin/bash
yarn build:server
docker build -t benawad/abb:latest .
docker push benawad/abb:latest
ssh root@167.99.11.233 "docker pull benawad/abb:latest && docker tag benawad/abb:latest dokku/abb:latest && dokku tags:deploy abb latest"