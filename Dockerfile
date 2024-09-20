FROM node:20.14-alpine

WORKDIR /app

ARG NODE_ENV=production
COPY package*.json ./

RUN npm install

COPY ./src/views ./dist/src/views

COPY . .

CMD [ "npm", "run", "build" ]

CMD [ "npm", "run", "start" ]
