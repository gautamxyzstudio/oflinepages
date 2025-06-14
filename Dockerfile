FROM node:18

# Install wget, zip and serve
RUN apt-get update && apt-get install -y wget zip && npm install -g serve

# Set working directory
WORKDIR /usr/src/app

# Copy project files
COPY . .

# Create output directory
RUN mkdir -p /data/offline_listings

# Optional: run download during build (can skip if you want to run every start)
# RUN node index.js

# Default command: run script + serve folder
CMD sh -c "node index.js && serve /data/offline_listings -l 8979"
