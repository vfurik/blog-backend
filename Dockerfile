FROM node:18.12.1-alpine as build

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN npm run build && npm prune --production

USER node

FROM node:18.12.1-alpine

WORKDIR /app

COPY --chown=node:node package*.json ./

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/config ./config
COPY --from=build /app/db ./db
COPY --from=build /app/.sequelizerc ./.sequelizerc

CMD ["sh", "-c", "npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npm run start:prod"]
