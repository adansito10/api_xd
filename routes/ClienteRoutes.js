/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       required:
 *         - nombre
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del cliente
 *         nombre:
 *           type: string
 *           description: Nombre del cliente
 *         apellidos:
 *           type: string
 *           description: Apellidos del cliente
 *         direccion:
 *           type: string
 *           description: Dirección del cliente
 *         telefono:
 *           type: string
 *           description: Teléfono del cliente
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del cliente
 *       example:
 *         id: 1
 *         nombre: "Ana"
 *         apellidos: "Gómez Pérez"
 *         direccion: "Calle Falsa 123"
 *         telefono: "555-1234"
 *         email: "ana.gomez@example.com"
 *
 * /api/clientes:
 *   get:
 *     summary: Obtiene todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Error en el servidor
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Error en la solicitud (falta de datos)
 *       500:
 *         description: Error en el servidor
 *
 * /api/clientes/{id}:
 *   get:
 *     summary: Obtiene un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error en el servidor
 *   put:
 *     summary: Actualiza un cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Error en la solicitud (falta de datos)
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error en el servidor
 *   delete:
 *     summary: Elimina un cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error en el servidor
 */

import express from 'express';
import ClienteController from '../Controller/ClienteController.js';

const router = express.Router();

// Rutas para clientes
router.get('/clientes', ClienteController.getAllClientes);
router.post('/clientes', ClienteController.createCliente);
router.get('/clientes/:id', ClienteController.getClienteById);
router.put('/clientes/:id', ClienteController.updateCliente);
router.delete('/clientes/:id', ClienteController.deleteCliente);

export default router;
