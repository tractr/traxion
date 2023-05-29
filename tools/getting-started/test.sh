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
RESULT=$(curl 'http://localhost:3000/graphql' \
  -X POST \
  -H 'content-type: application/json' \
  --data '{
    "query": "mutation { login(email: \"admin@traxion.dev\", password: \"password\") { user { id } } }"
  }')

# ----------------------------------
# Check the result
if [ -z "$RESULT" ]; then
    echo "Failed: Getting started test failed!"
    exit 1
else
    echo "Success: Getting started test passed!"
    exit 0
fi
