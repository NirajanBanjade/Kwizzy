# ---- Base ----
    FROM node:20-alpine

    WORKDIR /app
    
    # Install deps first (better cache)
    COPY package*.json ./
    RUN npm ci --omit=dev
    
    # Copy the rest
    COPY . .
    
    # If your server listens on 5000, change as needed
    EXPOSE 5000
    
    # Start the app
    CMD ["node", "server.js"]
    