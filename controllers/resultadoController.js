const db = require('../config/database');

// Obtener todos los resultados
const obtenerResultados = (req, res) => {
  const sql = 'SELECT * FROM resultados';

  db.execute(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los resultados', details: err });
    }
    res.json(results);
  });
};

// Crear un nuevo resultado
const crearResultado = (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El campo "nombre" es obligatorio' });
  }

  const sql = 'INSERT INTO resultados (nombre) VALUES (?)';

  db.execute(sql, [nombre], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'El resultado ya existe' });
      }
      return res.status(500).json({ error: 'Error al insertar el resultado', details: err });
    }

    res.status(201).json({
      message: 'Resultado creado correctamente',
      id: result.insertId,
      nombre
    });
  });
};

module.exports = { obtenerResultados, crearResultado };
