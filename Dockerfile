FROM node:18

# Install wget, zip, and serve globally
RUN apt-get update && \
    apt-get install -y wget zip && \
    npm install -g serve

# Set working directory
WORKDIR /usr/src/app

# Copy all project files (index.js, urls.txt, etc.)
COPY . .

# Create persistent output directory (mounted by Dokploy as volume)
RUN mkdir -p /data/offline_listings

# Copy frontend UI to /data (where serve will look)
COPY index.html /data/index.html

# Environment variable for output path
ENV OFFLINE_DIR=/data/offline_listings

# Main command: download pages, zip, serve
CMD ["sh", "-c", "node index.js && zip -r /data/offline.zip /data/offline_listings && serve /data -l 8979"]
