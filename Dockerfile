FROM node:18

# Install wget, zip and serve
RUN apt-get update && apt-get install -y wget zip && npm install -g serve

# Set working directory
WORKDIR /usr/src/app

# Copy project files
COPY . .

# Create output directory where pages will be saved
RUN mkdir -p /data/offline_listings

# Set environment variable so index.js saves directly to correct location
ENV OFFLINE_DIR=/data/offline_listings

# Default command: download pages and serve them
CMD sh -c "node index.js && serve /data/offline_listings -l 8979"
