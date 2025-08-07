const express = require('express');
const app = express();
const port = 3000;

const db = require('./config/database'); 

const opcionesRoutes = require('./routes/opcionesRoutes');
const resultadosRoutes = require('./routes/resultadosRoutes');
const partidasRoutes = require('./routes/partidasRoutes');

app.use(express.json());

app.use('/api/opciones', opcionesRoutes);
app.use('/api/resultados', resultadosRoutes);
app.use('/api/partidas', partidasRoutes);

app.get('/', (req, res) => {
  res.send('Backend está corriendo correctamente');
});

// Inicialización del servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
