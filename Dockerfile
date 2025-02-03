# Use a lightweight Node.js base image
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker's caching for npm install
COPY package*.json ./

# Install dependencies (npm ci is preferred for production)
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Expose the port that your app will run on (e.g., 5000)
EXPOSE 5000

# Set environment variables (for development or production)
ENV NODE_ENV=production

# Run the application
CMD ["node", "index.js"]
