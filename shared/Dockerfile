FROM node:20

WORKDIR /app/backend

COPY backend/package*.json ./
COPY backend/tsconfig.json ./
COPY backend/eslint.config.js ./
COPY backend/src ./src
COPY backend/logs ./logs
COPY backend/public ./public

RUN npm install
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]