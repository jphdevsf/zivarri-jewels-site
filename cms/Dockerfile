# cms/Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install --platform=linux --arch=x64 sharp && npm install

COPY . .

ENV NODE_ENV=development
EXPOSE 1337

CMD ["npm", "run", "start:env"]
