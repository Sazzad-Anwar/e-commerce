FROM node:16-alpine3.11
WORKDIR /app
COPY package.json .
RUN yarn
RUN npm install pm2 -g
COPY . ./
EXPOSE 8080
