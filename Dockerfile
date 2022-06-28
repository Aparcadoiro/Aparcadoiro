FROM beevelop/ionic:latest

COPY . .

CMD [ "npm", "start" ]

COPY package.json ./

RUN  npm install

EXPOSE 8100
