# Bulletin Board App

<p align="center">REST API based on Nest.js - a progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">

## Installation

```bash
# Install node_modules
yarn -f
```

## Running app for development

```bash
# Run DB in Docker and backend in terminal
yarn run:dev:env
```

## Running only Database

```bash
# development
$ yarn start:dev:db

# add migrations
$ yarn typeorm:migration:run

# generate new migration
$ yarn typeorm:migration:generate src/database/migrations/$migrationName
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Environments

```bash
- POSTGRES_CONTAINER=string
- POSTGRES_HOST=host
- POSTGRES_PORT=5432
- POSTGRES_USER=user
- POSTGRES_PASSWORD=password
- POSTGRES_DATABASE=db

- PORT=9000
- MODE=DEV
```
