# server/Dockerfile
FROM node:18
WORKDIR /app

# ✅ Copy from project root (go one level up)
COPY ../package*.json ./
RUN npm install

# ✅ Copy everything from project root (includes database/)
COPY .. .

EXPOSE 5001
CMD ["node", "server/server.js"]
