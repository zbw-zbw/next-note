FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install --registry=https://registry.npmmirror.com

RUN npx prisma generate

EXPOSE 3000

CMD npx prisma migrate deploy && npm run build && npm start