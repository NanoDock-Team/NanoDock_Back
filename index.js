const express = require('express');
const cors = require('cors'); // <-- Añade esta línea
const app = express();
const port = 3000;

const db = require('./config/database'); 

// Middlewares
app.use(cors()); // <-- Y esta
app.use(express.json());

// Rutas
const opcionesRoutes = require('./routes/opcionesRoutes');
const resultadosRoutes = require('./routes/resultadosRoutes');
const partidasRoutes = require('./routes/partidasRoutes');

app.use('/api/opciones', opcionesRoutes);
app.use('/api/resultados', resultadosRoutes);
app.use('/api/partidas', partidasRoutes);

// Inicialización del servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
