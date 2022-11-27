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
# migrations and seeds
$ npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all

# development
$ npm run start:dev

# production mode
$ docker-compose up -d
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
