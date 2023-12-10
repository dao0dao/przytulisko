FROM node:18.17.1

WORKDIR /app

COPY package.json .

RUN npm install

EXPOSE 3000

# CMD [ "npm", "run", "server" ]

CMD [ "npm", "run", "server:dev" ]