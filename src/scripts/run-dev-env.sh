#!/bin/bash

# Run PostgreSQL in Docker container
./src/scripts/start-db.sh

# Run migrations
yarn typeorm:migration:run

# Run dev server in terminal
yarn start:dev