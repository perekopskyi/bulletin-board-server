#!/bin/bash
set -e

#!/usr/bin/env sh
source .env

# `db` is the name of docker-compose service
echo "🚀 Stop & remove old docker [$POSTGRES_CONTAINER] and starting new fresh instance of [$POSTGRES_CONTAINER]"
(docker kill $POSTGRES_CONTAINER || :) && \
  (docker rm $POSTGRES_CONTAINER || :) && \
  docker-compose up -d --no-deps --build db 

# Wait for pg to start
echo "🚀 Sleep wait for pg-container [$POSTGRES_CONTAINER] to start"
sleep 3
until PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DATABASE" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 3
done

# Create the PostgreSQL database
echo "🚀 Creating database $POSTGRES_DATABASE ..."
if echo "CREATE DATABASE $POSTGRES_DATABASE ENCODING 'UTF-8';" | docker exec -i $POSTGRES_CONTAINER psql -U $POSTGRES_USER -h $POSTGRES_HOST; then
    echo "🚀 Database $POSTGRES_DATABASE created successfully."
else
    echo "🚀 Failed to create database $POSTGRES_DATABASE."
    exit 1
fi

# This line executes a PostgreSQL command to list all databases in the PostgreSQL server and displays the output in the console.
echo "\l" | docker exec -i $POSTGRES_CONTAINER psql -U $POSTGRES_USER -h $POSTGRES_HOST