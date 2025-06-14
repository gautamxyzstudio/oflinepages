FROM node:18

# Install wget
RUN apt-get update && apt-get install -y wget

# Create app directory
WORKDIR /usr/src/app

# Copy files
COPY . .

# Create output directory
RUN mkdir -p /data/offline_listings

# Make script executable
RUN chmod +x index.js

# Default command
CMD ["node", "index.js"]
