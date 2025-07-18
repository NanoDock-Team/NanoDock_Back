const express = require('express');
const router = express.Router();
const { obtenerOpciones } = require('../controllers/opcionesController');

// Ruta para obtener todas las opciones
router.get('/all', obtenerOpciones);

module.exports = router;
