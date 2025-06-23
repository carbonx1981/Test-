FROM node:18
WORKDIR /app
COPY package.json ./
COPY main.js ./
COPY static ./static
RUN npm install
EXPOSE 4000
CMD ["node", "main.js"]