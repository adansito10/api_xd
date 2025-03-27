/**
 * @swagger
 * components:
 *   schemas:
 *     Cita:
 *       type: object
 *       required:
 *         - fechacita
 *         - ubicacion
 *         - id_cliente
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la cita
 *         fechacita:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de la cita
 *         ubicacion:
 *           type: string
 *           description: Ubicación de la cita
 *         id_cliente:
 *           type: integer
 *           description: ID del cliente asociado a la cita
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la cita
 *         update_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización de la cita
 *         delete_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación lógica de la cita
 *       example:
 *         id: 1
 *         fechacita: "2024-12-01T09:00:00Z"
 *         ubicacion: "Consultorio 101"
 *         id_cliente: 25
 *         created_at: "2024-11-15T08:30:00Z"
 *         update_at: "2024-11-16T10:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Citas
 *   description: API para la gestión de citas
 */

/**
 * @swagger
 * /api/citas:
 *   get:
 *     summary: Obtiene todas las citas
 *     tags: [Citas]
 *     responses:
 *       200:
 *         description: Lista de citas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cita'
 *       500:
 *         description: Error en el servidor
 *   post:
 *     summary: Crea una nueva cita
 *     tags: [Citas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cita'
 *     responses:
 *       201:
 *         description: Cita creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cita'
 *       400:
 *         description: Error en la solicitud
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/citas/{id}:
 *   get:
 *     summary: Obtiene una cita por ID
 *     tags: [Citas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cita
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cita obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cita'
 *       404:
 *         description: Cita no encontrada
 *       500:
 *         description: Error en el servidor
 *   put:
 *     summary: Actualiza una cita existente
 *     tags: [Citas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cita
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cita'
 *     responses:
 *       200:
 *         description: Cita actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cita'
 *       404:
 *         description: Cita no encontrada
 *       500:
 *         description: Error en el servidor
 *   delete:
 *     summary: Elimina una cita existente
 *     tags: [Citas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cita
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Cita eliminada exitosamente
 *       404:
 *         description: Cita no encontrada
 *       500:
 *         description: Error en el servidor
 */


import express from 'express';
import CitaController from '../Controller/CitasController.js';

const router = express.Router();

router.get('/citas', CitaController.getAllCitas);
router.post('/citas', CitaController.createCita);
router.get('/citas/:id', CitaController.getCitaById);
router.put('/citas/:id', CitaController.updateCita);
router.delete('/citas/:id', CitaController.deleteCita);

export default router;
