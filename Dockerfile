# Usa una imagen base de Node.js
FROM node:18

# Crea el directorio de la app
WORKDIR /app

# Copia los archivos
COPY package*.json ./
RUN npm install

COPY . .

# Expone el puerto que usa la app 
EXPOSE 3000

# Comando para correr la app
CMD ["npm", "start"]
