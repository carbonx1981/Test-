# Bruk en offisiell Node.js-basisimage
FROM node:18

# Sett arbeidsmappe
WORKDIR /app

# Kopier package.json og package-lock.json (dersom det finnes)
COPY package.json ./
COPY main.js ./

# Installer avhengigheter
RUN npm install

# Eksponer porten
EXPOSE 4000

# Start serveren
CMD ["node", "main.js"]