FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN  ["npm", "ci"]
COPY . .
RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
