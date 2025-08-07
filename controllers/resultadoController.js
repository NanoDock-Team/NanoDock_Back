const db = require('../config/database');

// Obtener todos los resultados
const obtenerResultados = (req, res) => {
  console.log('[INFO] Petición para obtener resultados');

  const sql = 'SELECT * FROM resultados';

  db.execute(sql, (err, results) => {
    if (err) {
      console.error('[ERROR] Fallo al obtener resultados');
      return res.status(500).json({ error: 'Error al obtener los resultados' });
    }
    console.log('[SUCCESS] Resultados obtenidos');
    res.json(results);
  });
};

// Crear un nuevo resultado
const crearResultado = (req, res) => {
  console.log('[INFO] Petición para crear un nuevo resultado');

  const { nombre } = req.body;

  if (!nombre) {
    console.warn('[WARN] Campo "nombre" faltante');
    return res.status(400).json({ error: 'El campo "nombre" es obligatorio' });
  }

  const sql = 'INSERT INTO resultados (nombre) VALUES (?)';

  db.execute(sql, [nombre], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.warn('[WARN] Resultado duplicado');
        return res.status(409).json({ error: 'El resultado ya existe' });
      }
      console.error('[ERROR] Fallo al crear resultado');
      return res.status(500).json({ error: 'Error al insertar el resultado' });
    }

    console.log('[SUCCESS] Resultado creado correctamente');
    res.status(201).json({
      message: 'Resultado creado correctamente',
      id: result.insertId,
      nombre
    });
  });
};

module.exports = { obtenerResultados, crearResultado };
