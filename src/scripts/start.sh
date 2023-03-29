#!/bin/bash

#!/usr/bin/env sh
source .env

# This will first navigate to the frontend directory, stop and remove any running containers for the frontend, then navigate to the backend directory, stop and remove any running containers for the backend. 
# The --remove-orphans flag ensures that any containers not associated with a service defined in the docker-compose.yml file are also removed.
cd ./frontend
docker-compose down --remove-orphans
cd ../backend
docker-compose down --remove-orphans

# Start PostgreSQL and create database
echo "🚀 Starting PostgreSQL and creating database..."
docker-compose -f ./docker-compose.yml up -d

# # create the db
# echo "CREATE DATABASE $POSTGRES_DATABASE ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U $POSTGRES_USER
# echo "\l" | docker exec -i $SERVER psql -U $POSTGRES_USER


echo "🚀 Waiting for PostgreSQL to start..."
docker-compose -f ./docker-compose.yml run --rm wait-for-postgres

echo "🚀 Start the backend API..."
docker-compose up -d

echo "🚀 Start the frontend app..."
cd ../frontend
docker-compose up -d


