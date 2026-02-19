FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run generate

RUN npm run build

RUN npm prune --production

EXPOSE 8080

CMD ["npm", "start"]