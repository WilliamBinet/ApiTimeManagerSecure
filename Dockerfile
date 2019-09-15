FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install -g sequelize sequelize-cli mysql2 && npm install bcrypt-nodejs --save

COPY . .

RUN chmod +x entrypoint.sh

EXPOSE 3000

ENTRYPOINT  ["/app/entrypoint.sh"]
