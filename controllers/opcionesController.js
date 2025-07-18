const db = require('../config/database');

const obtenerOpciones = (req, res) => {
  const sql = 'SELECT * FROM opciones';

  db.execute(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener las opciones', details: err });
    }

    res.json(results);
  });
};

module.exports = { obtenerOpciones };
