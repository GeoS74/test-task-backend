FROM node

WORKDIR /bimend-test

COPY package.json .

RUN npm install

COPY . .

RUN npm run db:init

EXPOSE 3001

CMD ["node", "./index"]