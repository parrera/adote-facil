FROM node:20-alpine AS base

# Dependências
FROM base AS deps
# lib mais leve para rodar as ferramentas do Next.js
RUN apk add --no-cache libc6-compat 
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Desabilita a telemetria do Next.js durante o build para acelerar o build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Runner (Imagem de Produção)
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Criação de um usuário não-root para segurança: se invadir o container, não terá privilégio de admin
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Configuração do nome do grupo e usuário definidos anteriormente
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copia o build "standalone" (configurado no next.config.ts/js)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
# Permite que o Next.js escute em todas as interfaces, podendo acessar fora do container
ENV HOSTNAME="0.0.0.0"

# Inicialização mais leve, usando o server.js e a pasta ".next/standalone" criada
CMD ["node", "server.js"]