FROM node:alpine3.18 AS builder

WORKDIR /app
COPY . /app
RUN ["npm", "i", "--verbose"]
RUN ["npm", "run", "build"]


FROM nginx

COPY --from=builder /app/dist /usr/share/nginx/html
