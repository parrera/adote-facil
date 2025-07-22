FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run generate

RUN npm run build

EXPOSE 8080

# Adiciona o script wait-for
ADD https://raw.githubusercontent.com/eficode/wait-for/master/wait-for /wait-for
RUN chmod +x /wait-for


CMD ["npm", "start"]




# FROM node:20.14.0-alpine

# RUN apk add --no-cache openssl bash

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm install

# COPY . .

# COPY wait-for-it.sh /wait-for-it.sh
# RUN chmod +x /wait-for-it.sh

# RUN npm run generate
# RUN npm run build

# EXPOSE 8080

# CMD ["/wait-for-it.sh", "adote-facil-postgres:5432", "--", "npm", "start"]