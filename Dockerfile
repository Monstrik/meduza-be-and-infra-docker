FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /server

COPY package.json pnpm-lock.yaml ./
COPY . .
RUN pnpm install
RUN pnpm build

EXPOSE 9000
EXPOSE 5173

CMD ["./start.sh"]