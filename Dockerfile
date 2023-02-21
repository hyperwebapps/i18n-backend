FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run psm:migrate &&\
    npm run psm:generate &&\
    npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]

