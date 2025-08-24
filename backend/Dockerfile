FROM node:20-alpine

# Dependências do sistema necessárias
RUN apk add --no-cache openssl

WORKDIR /app

# Copia arquivos de dependências e instala com cache layer otimizada
COPY package.json package-lock.json ./
RUN npm ci --silent && npm cache clean --force

# Copia o restante do código
COPY . .

# Gera e testa (mantém comportamento atual de build)
RUN npm run generate
RUN npm run test
RUN npm run build

# Cria usuário não-root para execução
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

ENV NODE_ENV=production
USER appuser

EXPOSE 8080

# Healthcheck que verifica /health em 8080 
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD node -e "const http=require('http'); const req=http.get('http://127.0.0.1:8080/health', res=>{process.exit(res.statusCode===200?0:1)}); req.on('error', ()=>process.exit(1));"

CMD ["npm", "start"]
