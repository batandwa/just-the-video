#!/bin/sh

REPO=batandwa/just-the-video
BUILD_IMAGE=just-the-video-build
TAG=`if [ "$TRAVIS_BRANCH" == "master" ]; then echo "latest"; else echo $TRAVIS_BRANCH ; fi`
TAG="${TAG/feature\//}"
TAG="${TAG/release\//}"
DEST_DIR=/home/$APP_HOST_USER/projects/just_the_video
# APP_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')

docker push $REPO:$TAG

openssl aes-256-cbc -K $encrypted_75ea7b9aaeb2_key -iv $encrypted_75ea7b9aaeb2_iv -in id_rsa.enc -out /tmp/id_rsa -d
chmod 0600 /tmp/id_rsa
ssh -o StrictHostKeyChecking=no -i /tmp/id_rsa $APP_HOST_USER@$APP_HOST "mkdir -p $DEST_DIR"
scp -o StrictHostKeyChecking=no -i /tmp/id_rsa docker-compose.yml $APP_HOST_USER@$APP_HOST:$DEST_DIR
ssh -o StrictHostKeyChecking=no -i /tmp/id_rsa $APP_HOST_USER@$APP_HOST "cd $DEST_DIR && TAG=$TAG docker-compose pull web && TAG=$TAG docker-compose up -d --force-recreate"
