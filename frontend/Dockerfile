# frontend/Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install --platform=linux --arch=x64 --legacy-peer-deps --ignore-scripts

COPY . .

ENV NODE_ENV=development
EXPOSE 3000

CMD ["npm", "run", "start:env"]
