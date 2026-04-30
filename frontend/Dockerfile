FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["npm", "start"]
