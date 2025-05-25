FROM node:18

WORKDIR /app

COPY package*.json ./
COPY source.config.ts ./

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]