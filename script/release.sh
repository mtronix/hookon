#!/usr/bin/env bash

GITHUB_API_URL='https://api.github.com'
GITHUB_TOKEN=43c976900cfd247fff970374531833a66ea1911c

# Generate changelog based on git versions tags

# Get last version commit ()
LAST_VERSION=$(git describe --match "v[0-9]*" --abbrev=0 HEAD 2>/dev/null || git rev-list --max-parents=0 HEAD)

#LAST_VERSION=$(git describe --match "v[0-9]*" --abbrev=0 HEAD 2>/dev/null || git rev-list --max-parents=0 HEAD)



curl -s --header "Authorization: token $GITHUB_TOKEN" "$GITHUB_API_URL/repos/mtronix/hookon" | jq -r '.id'


#gren release --token=$GITHUB_TOKEN  --tags=$LAST_VERSION
#
#git log \
#  --oneline \
#  --no-merges \
#  --decorate \
#  --reverse \
#  --pretty=format:"[%h] %H %an (%ae) %s" $LAST_VERSION..HEAD