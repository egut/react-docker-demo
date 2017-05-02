FROM node:7.9.0-alpine

EXPOSE 3000
# Set a working directory
WORKDIR /usr/src/app

ADD package.json .
RUN npm install

ADD . .
RUN npm run build

# Install Node.js dependencies
RUN yarn install --production --no-progress

CMD [ "node", "build/server.js" ]
