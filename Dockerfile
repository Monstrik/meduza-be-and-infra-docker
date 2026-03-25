FROM node:20-alpine AS builder

WORKDIR /server
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:20-alpine

WORKDIR /server
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /server ./

EXPOSE 9000
#EXPOSE 5173
CMD ["./start.sh"]