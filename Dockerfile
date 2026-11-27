FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY server.js ./
COPY public ./public
COPY data ./data

EXPOSE 8888

CMD ["npm", "start"]
