FROM node:18.17.1

WORKDIR /app

COPY package.json .

RUN npm install

COPY angular.json .
COPY tsconfig.app.json .
COPY tsconfig.json .
COPY tsconfig.spec.json .

RUN npm install -g @angular/cli

CMD [ "npm", "start" ]