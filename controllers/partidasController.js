const db = require('../config/database');

// Obtener todas las partidas (lectura)
const obtenerPartidas = (req, res) => {
  const sql = `
    SELECT p.id, p.fecha, 
           ou.nombre AS eleccion_usuario, 
           oc.nombre AS eleccion_cpu, 
           r.nombre AS resultado
    FROM partidas p
    JOIN opciones ou ON p.id_opcion_usuario = ou.id
    JOIN opciones oc ON p.id_opcion_cpu = oc.id
    JOIN resultados r ON p.id_resultado = r.id
    ORDER BY p.fecha DESC
  `;

  db.execute(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener partidas', details: err });
    }
    res.json(results);
  });
};

// Obtener una partida por ID
const obtenerPartidaPorId = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT p.id, p.fecha, 
           ou.nombre AS eleccion_usuario, 
           oc.nombre AS eleccion_cpu, 
           r.nombre AS resultado
    FROM partidas p
    JOIN opciones ou ON p.id_opcion_usuario = ou.id
    JOIN opciones oc ON p.id_opcion_cpu = oc.id
    JOIN resultados r ON p.id_resultado = r.id
    WHERE p.id = ?
  `;

  db.execute(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener la partida', details: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Partida no encontrada' });
    }
    res.json(results[0]);
  });
};

// Crear nueva partida
const crearPartida = (req, res) => {
  const { id_opcion_usuario, id_opcion_cpu, id_resultado } = req.body;

  if (
    !id_opcion_usuario ||
    !id_opcion_cpu ||
    !id_resultado
  ) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  const sql = `
    INSERT INTO partidas (id_opcion_usuario, id_opcion_cpu, id_resultado) 
    VALUES (?, ?, ?)
  `;

  db.execute(sql, [id_opcion_usuario, id_opcion_cpu, id_resultado], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear partida', details: err });
    }
    res.status(201).json({
      message: 'Partida creada correctamente',
      id: result.insertId
    });
  });
};

// Actualizar una partida (solo resultado y elecciones)
const actualizarPartida = (req, res) => {
  const { id } = req.params;
  const { id_opcion_usuario, id_opcion_cpu, id_resultado } = req.body;

  if (
    !id_opcion_usuario ||
    !id_opcion_cpu ||
    !id_resultado
  ) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  const sql = `
    UPDATE partidas 
    SET id_opcion_usuario = ?, id_opcion_cpu = ?, id_resultado = ? 
    WHERE id = ?
  `;

  db.execute(sql, [id_opcion_usuario, id_opcion_cpu, id_resultado, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar partida', details: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Partida no encontrada' });
    }
    res.json({ message: 'Partida actualizada correctamente' });
  });
};

// Eliminar una partida
const eliminarPartida = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM partidas WHERE id = ?';

  db.execute(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar partida', details: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Partida no encontrada' });
    }
    res.json({ message: 'Partida eliminada correctamente' });
  });
};

module.exports = {
  obtenerPartidas,
  obtenerPartidaPorId,
  crearPartida,
  actualizarPartida,
  eliminarPartida
};
