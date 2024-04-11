FROM node:20

ARG UID
ARG GID
ARG NODE_ENV=development

ENV NODE_ENV=${NODE_ENV}

RUN yarn global add pm2 cross-env

RUN groupmod -o -g ${GID} node && usermod -o -u ${UID} -g node node

WORKDIR /var/www/bot

USER node

CMD yarn && yarn dev
