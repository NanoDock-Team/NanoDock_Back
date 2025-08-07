# Usa una imagen base de Node.js
FROM node:18

# Crea el directorio de la app
WORKDIR /app

# Copia los archivos
COPY package*.json ./
RUN npm install

COPY . .

# Expone el puerto que usa tu app (verifica que es 3000 o el que uses)
EXPOSE 3000

# Comando para correr la app
CMD ["npm", "start"]
