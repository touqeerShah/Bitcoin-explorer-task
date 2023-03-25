FROM node:14-alpine
WORKDIR /app
COPY . .
COPY .env-docker .env
RUN npm install && printf "ls\nnpm run start\n" > entrypoint.sh
EXPOSE 8080
CMD ["/bin/sh","entrypoint.sh"]
