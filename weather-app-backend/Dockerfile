FROM node:16-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .


RUN yarn install 
RUN yarn add global @nestjs/cli
RUN yarn build

CMD ["yarn", "start"]

# EXPOSE 3000