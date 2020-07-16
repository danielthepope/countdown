FROM node:10-alpine

WORKDIR /usr/src/app

# Install dependencies.
COPY package*.json ./

RUN npm install

# Copy project directory.
COPY . ./

RUN npm run build
RUN npm run test

CMD [ "npm", "start" ]
