
/**
 * @swagger
 * components:
 *   schemas:
 *     Venta:
 *       type: object
 *       required:
 *         - monto
 *         - id_cliente
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la venta
 *         monto:
 *           type: number
 *           description: Monto total de la venta
 *         id_cliente:
 *           type: integer
 *           description: ID del cliente relacionado
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la venta
 *         update_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización de la venta
 *         delete_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación de la venta
 *       example:
 *         id: 1
 *         monto: 1000
 *         id_cliente: 2
 *         created_at: "2024-10-10T08:30:00Z"
 *         update_at: null
 *         delete_at: null
 *
 * /api/ventas:
 *   get:
 *     summary: Obtiene todas las ventas
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de ventas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venta'
 *       500:
 *         description: Error en el servidor
 * 
 *   post:
 *     summary: Crea una nueva venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venta'
 *     responses:
 *       201:
 *         description: Venta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venta'
 *       400:
 *         description: Error en la solicitud (falta de datos)
 *       500:
 *         description: Error en el servidor
 *
 * /api/ventas/{id}:
 *   get:
 *     summary: Obtiene una venta por ID
 *     tags: [Ventas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la venta
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venta'
 *       404:
 *         description: Venta no encontrada
 *       500:
 *         description: Error en el servidor
 * 
 *   put:
 *     summary: Actualiza una venta existente
 *     tags: [Ventas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la venta
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venta'
 *     responses:
 *       200:
 *         description: Venta actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venta'
 *       400:
 *         description: Error en la solicitud (falta de datos)
 *       404:
 *         description: Venta no encontrada
 *       500:
 *         description: Error en el servidor
 * 
 *   delete:
 *     summary: Elimina una venta por ID
 *     tags: [Ventas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la venta
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Venta eliminada exitosamente
 *       404:
 *         description: Venta no encontrada
 *       500:
 *         description: Error en el servidor
 */



import express from 'express';
import VentasController from '../Controller/VentaController.js';

const router = express.Router();

// Rutas principales
router.get('/ventas', VentasController.getAll);
router.post('/ventas', VentasController.create);
router.get('/ventas/:id', VentasController.getById);
router.put('/ventas/:id', VentasController.update);
router.delete('/ventas/:id', VentasController.delete);

// Generar ticket y reporte
router.get('/ventas/:id/ticket', VentasController.getReporte);


export default router;
