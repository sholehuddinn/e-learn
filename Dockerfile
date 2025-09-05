# Gunakan Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "run", "dev"]
 