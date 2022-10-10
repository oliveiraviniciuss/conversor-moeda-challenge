FROM node:alpine

WORKDIR /

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3000

cmd ["npm", "start"]