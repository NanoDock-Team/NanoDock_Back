const express = require('express');
const router = express.Router();
const {
  obtenerPartidas,
  obtenerPartidaPorId,
  crearPartida,
  actualizarPartida,
  eliminarPartida,
  calcularResultado
} = require('../controllers/partidasController');

router.get('/all', obtenerPartidas);
router.get('/part/:id', obtenerPartidaPorId);
router.post('/', crearPartida);
router.put('/up/:id', actualizarPartida);
router.delete('/del/:id', eliminarPartida);
router.post('/calcular', calcularResultado);

module.exports = router;
