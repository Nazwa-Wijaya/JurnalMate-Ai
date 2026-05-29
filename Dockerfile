# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Enable npm ci caching
COPY package*.json ./
RUN npm ci

# Copy all source files and compile
COPY . .
RUN npm run build

# Stage 2: Runner build
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy package descriptors and pull production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy compiled backend and frontend assets from builder
COPY --from=builder /app/dist ./dist

# Standard Cloud Run exposed port
EXPOSE 3000

CMD ["npm", "start"]
