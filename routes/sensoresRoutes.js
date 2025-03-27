import express from "express";
import Sensor from "../models/Sensor.js"; // Asegúrate de que la ruta sea correcta

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sensores
 *   description: Endpoints para la gestión de sensores
 */

/**
 * @swagger
 * /api/sensores:
 *   get:
 *     summary: Obtener todos los sensores
 *     tags: [Sensores]
 *     responses:
 *       200:
 *         description: Lista de todos los sensores almacenados en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "67b5418d56068a567c2995d0"
 *                   nombre:
 *                     type: string
 *                     example: "Sensor de temperatura"
 *                   valor:
 *                     type: number
 *                     example: 33.5
 *       500:
 *         description: Error al obtener los sensores
 */
router.get("/sensores", async (req, res) => {
  try {
    const sensores = await Sensor.find({}, "nombre valor");
    res.json(sensores);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los sensores", error });
  }
});

/**
 * @swagger
 * /api/sensores:
 *   post:
 *     summary: Crear un nuevo sensor
 *     tags: [Sensores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "xd"
 *               valor:
 *                 type: number
 *                 example: 33.5
 *     responses:
 *       201:
 *         description: Sensor creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "67b5418d56068a567c2995d0"
 *                 nombre:
 *                   type: string
 *                   example: "xd"
 *                 valor:
 *                   type: number
 *                   example: 33.5
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error al crear el sensor
 */
router.post("/sensores", async (req, res) => {
  try {
    const { nombre, valor } = req.body;
    if (!nombre || valor === undefined) {
      return res.status(400).json({ message: "Nombre y valor son requeridos" });
    }

    const nuevoSensor = new Sensor({ nombre, valor });
    const sensorGuardado = await nuevoSensor.save();

    res.status(201).json(sensorGuardado);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el sensor", error });
  }
});

export default router;
