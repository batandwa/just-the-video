#!/bin/sh

REPO=batandwa/just-the-video
BUILD_IMAGE=just-the-video-build
TAG=`if [ "$TRAVIS_BRANCH" == "master" ]; then echo "latest"; else echo $TRAVIS_BRANCH ; fi`
TAG="${TAG/feature\//}"
DEST_DIR=/home/$APP_HOST_USER/projects/just_the_video
# APP_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')

docker run --rm -it -v `pwd`:/code batandwa/$BUILD_IMAGE:latest sh -c "cd /code && ls -alh && npm install && grunt --gruntfile=gruntfile.js setup build"
docker build -f Dockerfile -t $REPO:$TAG .
docker login --username $DOCKER_REGISTRY_USER --password "$DOCKER_REGISTRY_PASSWORD"
docker run -d -p 80:80 $REPO:$TAG
sleep 5
curl localhost:80 --head

docker push $REPO:$TAG

openssl aes-256-cbc -K $encrypted_75ea7b9aaeb2_key -iv $encrypted_75ea7b9aaeb2_iv -in id_rsa.enc -out /tmp/id_rsa -d
chmod 0600 /tmp/id_rsa
ssh -o StrictHostKeyChecking=no -i /tmp/id_rsa $APP_HOST_USER@$APP_HOST mkdir -p $DEST_DIR
scp -o StrictHostKeyChecking=no -i /tmp/id_rsa docker-compose.yml $APP_HOST_USER@$APP_HOST:$DEST_DIR
ssh -o StrictHostKeyChecking=no -i /tmp/id_rsa $APP_HOST_USER@$APP_HOST cd $DEST_DIR && TAG=$TAG docker-compose up -d
