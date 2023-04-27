#!/usr/bin/env bash

set -e
set -o pipefail

BASE_DIR="${PWD}";
PROJECT_DIR="${BASE_DIR}/tools/getting-started/nestjs-prisma-demo"
PID=""

# ----------------------------------
# Stop the server on exit
cleanup() {
    echo "Cleaning up Node.js processes..."
    pkill -f "node"
}
trap cleanup ERR
trap cleanup EXIT

# ----------------------------------
# Step 10: Run the application
# Go to project directory
cd "${PROJECT_DIR}" || exit 1
# Start the server and keep process id
npm run start:dev &
# Keep process id
PID=$!
# Wait for server to start
sleep 30

# ----------------------------------
# Step 11: Test the application
# CURL the graphql endpoint and create an user
RESULT=$(curl -s 'http://localhost:3000/graphql' \
  -H 'Accept-Language: en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Origin: http://localhost:3000' \
  -H 'Pragma: no-cache' \
  -H 'Referer: http://localhost:3000/graphql' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36' \
  -H 'accept: */*' \
  -H 'content-type: application/json' \
  -H 'sec-ch-ua: "Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  --data-raw '{"operationName":null,"variables":{},"query":"mutation {\n  createUser(data: {email: \"user@emails.com\", name: \"User\"}) {\n    id\n    email\n    name\n  }\n}\n"}' \
  --compressed | grep 'user@emails.com')

# ----------------------------------
# Check the result
if [ -z "$RESULT" ]; then
    echo "Failed: Getting started test failed!"
    exit 1
else
    echo "Success: Getting started test passed!"
    exit 0
fi
