FROM node:20-alpine

RUN apk add --no-cache openssl

# Copia arquivos de dependência primeiro para aproveitar cache de camadas do Docker
COPY package.json package-lock.json ./

# Usa 'npm ci' para garantir instalação exata baseada no lockfile
RUN npm ci

# Copia o restante do código fonte
COPY . .

# Gera o cliente do Prisma
RUN npm run generate

# Compila o TypeScript para JavaScript (gera pasta dist)
RUN npm run build

# Remove dependências de desenvolvimento para limpar o node_modules
RUN npm prune --production


# Imagem Final de Produção:
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl netcat-openbsd

# Cria um usuário não-root para segurança (boas práticas)
# A imagem node:20-alpine já vem com o usuário 'node', apenas garantimos permissões

# Copia apenas o necessário da etapa de construção
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Define variáveis de ambiente padrão (podem ser sobrescritas)
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Muda para usuário não privilegiado
USER node

# Comando de inicialização otimizado
CMD ["npm", "start"]