FROM node:26-alpine

WORKDIR /usr/src/app

# Install dependencies.
COPY package*.json ./

RUN npm install

# Copy project directory.
COPY . ./

RUN npm run build
# Test dependencies aren't installed, so we can't run tests in this image.
# RUN npm run test

CMD [ "npm", "start" ]
