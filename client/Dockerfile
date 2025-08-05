# Stage 1: Build the React app
FROM node:18 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

# Stage 2: Serve using Nginx
FROM nginx:alpine

# Remove default static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the React build output to Nginx's public folder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
