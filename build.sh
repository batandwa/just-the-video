#!/bin/sh

REPO=batandwa/just-the-video
BUILD_IMAGE=just-the-video-build
TAG=`if [ "$TRAVIS_BRANCH" == "master" ]; then echo "latest"; else echo $TRAVIS_BRANCH ; fi`
TAG="${TAG/feature\//}"
TAG="${TAG/release\//}"
DEST_DIR=/home/$APP_HOST_USER/projects/just_the_video

docker run --rm -it -v `pwd`:/code batandwa/$BUILD_IMAGE:latest \
        sh -c "cd /code && ls -alh && npm install && grunt -v --gruntfile=gruntfile.js setup build"
docker login --username $DOCKER_REGISTRY_USER --password "$DOCKER_REGISTRY_PASSWORD"
docker run -d -p 80:80 $REPO:$TAG
sleep 5
curl localhost:80 --head

# Only push releases.
if [[ $TAG = *"release\/"* ]]; then
  docker push $REPO:$TAG
fi
