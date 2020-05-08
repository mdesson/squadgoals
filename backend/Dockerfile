FROM mhart/alpine-node:latest

WORKDIR /backend

COPY package*.json /backend/

RUN npm install

COPY . /backend/

EXPOSE 3100

CMD ["npm", "start"]