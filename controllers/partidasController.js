const db = require('../config/database');

// Obtener todas las partidas (lectura)
const obtenerPartidas = (req, res) => {
  console.log('📥 Solicitando lista de partidas');

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
      console.error('❌ Error al obtener partidas');
      return res.status(500).json({ error: 'Error interno al procesar la solicitud' });
    }

    console.log('✅ Partidas obtenidas correctamente');
    res.json(results);
  });
};

// Obtener una partida por ID
const obtenerPartidaPorId = (req, res) => {
  const { id } = req.params;
  console.log(`📥 Buscando partida con ID: ${id}`);

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
      console.error('❌ Error al obtener partida por ID');
      return res.status(500).json({ error: 'Error interno al procesar la solicitud' });
    }
    if (results.length === 0) {
      console.warn('⚠️ Partida no encontrada');
      return res.status(404).json({ error: 'Partida no encontrada' });
    }

    console.log('✅ Partida encontrada');
    res.json(results[0]);
  });
};

// Crear nueva partida
const calcularResultado = (req, res) => {
  console.log('⚙️ Calculando resultado de partida');

  const { idUsuario, idCpu } = req.body;

  if (idUsuario == null || idCpu == null) {
    console.warn('⚠️ Faltan parámetros para calcular resultado');
    return res.status(400).json({ error: 'Faltan parámetros' });
  }

  if (idUsuario === idCpu) return res.json({ id: 3 }); // Empate

  const ganaUsuario = (
    (idUsuario === 1 && idCpu === 3) ||
    (idUsuario === 2 && idCpu === 1) ||
    (idUsuario === 3 && idCpu === 2)
  );

  console.log('✅ Resultado calculado');
  return res.json({ id: ganaUsuario ? 1 : 2 }); // 1=Victoria, 2=Derrota
};

const crearPartida = (req, res) => {
  console.log('📝 Creando nueva partida');

  const { id_opcion_usuario, id_opcion_cpu, id_resultado } = req.body;

  if (!id_opcion_usuario || !id_opcion_cpu || !id_resultado) {
    console.warn('⚠️ Faltan datos obligatorios para crear partida');
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  const sql = `
    INSERT INTO partidas (id_opcion_usuario, id_opcion_cpu, id_resultado) 
    VALUES (?, ?, ?)
  `;

  db.execute(sql, [id_opcion_usuario, id_opcion_cpu, id_resultado], (err, result) => {
    if (err) {
      console.error('❌ Error al crear partida');
      return res.status(500).json({ error: 'Error interno al crear partida' });
    }

    console.log('✅ Partida creada con ID:', result.insertId);
    res.status(201).json({
      message: 'Partida creada correctamente',
      id: result.insertId
    });
  });
};

// Actualizar una partida (solo resultado y elecciones)
const actualizarPartida = (req, res) => {
  const { id } = req.params;
  console.log(`✏️ Actualizando partida ID: ${id}`);

  const { id_opcion_usuario, id_opcion_cpu, id_resultado } = req.body;

  if (!id_opcion_usuario || !id_opcion_cpu || !id_resultado) {
    console.warn('⚠️ Faltan datos obligatorios para actualizar');
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  const sql = `
    UPDATE partidas 
    SET id_opcion_usuario = ?, id_opcion_cpu = ?, id_resultado = ? 
    WHERE id = ?
  `;

  db.execute(sql, [id_opcion_usuario, id_opcion_cpu, id_resultado, id], (err, result) => {
    if (err) {
      console.error('❌ Error al actualizar partida');
      return res.status(500).json({ error: 'Error interno al actualizar partida' });
    }

    if (result.affectedRows === 0) {
      console.warn('⚠️ Partida no encontrada para actualizar');
      return res.status(404).json({ error: 'Partida no encontrada' });
    }

    console.log('✅ Partida actualizada correctamente');
    res.json({ message: 'Partida actualizada correctamente' });
  });
};

// Eliminar una partida
const eliminarPartida = (req, res) => {
  const { id } = req.params;
  console.log(`🗑️ Eliminando partida ID: ${id}`);

  const sql = 'DELETE FROM partidas WHERE id = ?';

  db.execute(sql, [id], (err, result) => {
    if (err) {
      console.error('❌ Error al eliminar partida');
      return res.status(500).json({ error: 'Error interno al eliminar partida' });
    }

    if (result.affectedRows === 0) {
      console.warn('⚠️ Partida no encontrada para eliminar');
      return res.status(404).json({ error: 'Partida no encontrada' });
    }

    console.log('✅ Partida eliminada correctamente');
    res.json({ message: 'Partida eliminada correctamente' });
  });
};

module.exports = {
  obtenerPartidas,
  obtenerPartidaPorId,
  crearPartida,
  actualizarPartida,
  eliminarPartida,
  calcularResultado
};
