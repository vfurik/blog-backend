## Description

Example of service which interacts with external services.

## Technologies

[Nest](https://github.com/nestjs/nest): framework for building web applications.\
[Sequelize](https://github.com/sequelize/sequelize-typescript): modern TypeScript and Node.js ORM.\
[Wiremock](https://wiremock.org): flexible API mocking.\
[Inbucket](https://inbucket.org): email testing application.
## Installation

```bash
$ npm install
```

## Running the app

```bash
# docker-compose(see env_file)
$ docker-compose up -d

# For local development: migrations and seeds
$ npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all

# run app
$ npm run start:dev


```

## Test

```bash
# e2e tests
$ npm run test:e2e
```

## Swagger

```
http://localhost:3000/api
Postman collection included
```
## Inbucket

```
http://localhost:9000/monitor
```