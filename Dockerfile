FROM node:lts-alpine3.14

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

USER node

COPY --chown=node:node . .

RUN npm install

RUN ["chmod", "+x", "docker-entrypoint.sh"]

ENTRYPOINT ["sh","docker-entrypoint.sh"]

EXPOSE 3000