const express = require('express');
const router = express.Router();
const { obtenerResultados, crearResultado } = require('../controllers/resultadoController');

router.get('/all', obtenerResultados);
router.post('/', crearResultado);

module.exports = router;
