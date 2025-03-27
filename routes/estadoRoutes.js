import express from 'express';
import Estado from '../models/estadoModel.js';

const router = express.Router();


router.get('/estados', async (req, res) => {
  try {
    const estados = await Estado.find();
    res.json(estados);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los estados', error });
  }
});


router.post('/estados', async (req, res) => {
  try {
    const { id, elemento, valor, unidad_modelo } = req.body;
    const nuevoEstado = new Estado({ id, elemento, valor, unidad_modelo });
    await nuevoEstado.save();
    res.status(201).json({ mensaje: 'Estado guardado', estado: nuevoEstado });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al guardar el estado', error });
  }
});


router.put('/estados/:id', async (req, res) => {
  try {
    const { valor, unidad_modelo } = req.body;
    const estado = await Estado.findOneAndUpdate(
      { id: req.params.id },
      { valor, unidad_modelo, fecha_hora: Date.now() },
      { new: true, runValidators: true }
    );
    if (!estado) return res.status(404).json({ mensaje: 'Estado no encontrado' });
    res.json({ mensaje: 'Estado actualizado', estado });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el estado', error });
  }
});

export default router;