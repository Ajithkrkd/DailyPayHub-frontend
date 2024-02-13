FROM node:20-alpine3.19
WORKDIR /app
COPY package*.json ./
COPY vite.config.js ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
