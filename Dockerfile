FROM node:20.14-alpine

WORKDIR /app

ARG NODE_ENV=production
COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]