const db = require('../config/database');

const obtenerOpciones = (req, res) => {
  console.log('📥 Solicitud recibida para obtener opciones');

  const sql = 'SELECT * FROM opciones';

  db.execute(sql, (err, results) => {
    if (err) {
      console.error('❌ Error al consultar las opciones en la base de datos');
      return res.status(500).json({ error: 'Error interno al procesar la solicitud' });
    }

    console.log('✅ Opciones obtenidas correctamente');
    res.json(results);
  });
};

module.exports = { obtenerOpciones };
