# --- build stage ---
    FROM node:20-alpine AS build
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci
    COPY . .
    RUN npm run build   # Vite writes to /app/dist
    
    # --- runtime stage ---
    FROM nginx:alpine
    # for plain Vite output, copy dist -> nginx html root
    COPY --from=build /app/dist /usr/share/nginx/html
    # (optional) SPA fallback for client-side routing:
    # COPY nginx.conf /etc/nginx/conf.d/default.conf
    EXPOSE 80
    