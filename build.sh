#!/bin/sh

export REPO=batandwa/just-the-video
export TAG=`if [ "$TRAVIS_BRANCH" == "master" ]; then echo "latest"; else echo $TRAVIS_BRANCH ; fi`
export TAG="${TAG/feature\//}"
docker run --rm -it -v `pwd`:/code batandwa/just-the-video-build:latest sh -c "cd /code && ls -alh && npm install && grunt --gruntfile=gruntfile.js setup build"
docker build -f Dockerfile -t $REPO:$TAG .
docker login --username $DOCKER_REGISTRY_USER --password "$DOCKER_REGISTRY_PASSWORD"
docker run -d -p 80:80 $REPO:$TAG
sleep 5
curl localhost:80 --head
docker push $REPO:$TAG
