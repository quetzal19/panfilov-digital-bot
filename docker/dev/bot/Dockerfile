FROM node:20

ARG UID
ARG GID
ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV}

RUN yarn global add pm2 typescript

RUN groupmod -o -g ${GID} node && usermod -o -u ${UID} -g node node

RUN touch /var/log/lock.log

WORKDIR /var/www/bot

USER node

CMD pm2 start && tail -f /var/log/lock.log
