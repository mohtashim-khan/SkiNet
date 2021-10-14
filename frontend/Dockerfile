FROM node:lts-alpine3.14

RUN apk add bash

COPY ./package.json /application/frontend/package.json

WORKDIR application/frontend

RUN npm install

COPY . .

RUN ls

ENTRYPOINT ["npm", "start"]
