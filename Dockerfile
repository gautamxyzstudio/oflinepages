FROM node:18

RUN apt-get update && apt-get install -y wget zip && npm install -g serve

WORKDIR /usr/src/app

COPY . .

RUN mkdir -p /data/offline_listings

# copy UI page to /data
COPY index.html /data/index.html

ENV OFFLINE_DIR=/data/offline_listings

CMD sh -c "node index.js && zip -r /data/offline.zip /data/offline_listings && serve /data -l 8979"
