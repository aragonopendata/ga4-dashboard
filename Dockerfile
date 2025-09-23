# Build stage
FROM node:18.16.0-bullseye AS build

# Build arguments for environment configuration
ARG BUILD_CONFIGURATION=production
ARG BASE_HREF=/servicios/dashboardanalytics/

# LABEL about the custom image
LABEL maintainer="helpdesk@desidedatum.com"
LABEL version="0.1"
LABEL description="Analytics v4 dashboard"

# Update Ubuntu Software repository
RUN apt update
RUN apt -y install curl

# Install Angular CLI
RUN npm install -g @angular/cli@16.0.1

WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Clean cache and build
RUN ng cache clean
RUN ng build --configuration=${BUILD_CONFIGURATION} --base-href ${BASE_HREF}

# Production stage
FROM nginx:alpine

# Copy built app from build stage
COPY --from=build /app/dist/ga4-dashboard /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]