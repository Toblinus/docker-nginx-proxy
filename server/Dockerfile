FROM node:16.3.0-alpine

WORKDIR /app

COPY . /app

EXPOSE 7300

RUN ["npm", "i", "--verbose"]

CMD ["node", "/app/src/index.js"]
