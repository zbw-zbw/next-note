FROM node:18-alpine

# RUN apt-get update -y
# RUN apt-get install -y openssl

WORKDIR /app

COPY . .

RUN yarn

RUN chmod +x /app/dev.startup.sh

ENTRYPOINT ["sh", "/app/dev.startup.sh"]
