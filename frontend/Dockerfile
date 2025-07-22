FROM node:20-alpine3.20

# Update Alpine packages to reduce vulnerabilities
RUN apk update && apk upgrade --no-cache

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
