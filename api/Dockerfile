FROM node:latest
WORKDIR /api
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 4000
CMD [ "node", "app.js" ]