# Build stage
FROM node:20 AS build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# --- 👇 Add these lines 👇 ---
# Accept API URL from docker-compose build args
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
# --- 👆 Add these lines 👆 ---

# Build the app (uses VITE_API_URL)
RUN npm run build

# Production stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy built app from build stage
COPY --from=build /app/dist .

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
