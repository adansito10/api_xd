/**
 * @swagger
 * components:
 *   schemas:
 *     Empleado:
 *       type: object
 *       required:
 *         - nombre
 *         - RFC
 *         - telefono
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del empleado
 *         nombre:
 *           type: string
 *           description: Nombre del empleado
 *         apellidos:
 *           type: string
 *           description: Apellidos del empleado
 *         RFC:
 *           type: string
 *           description: Registro Federal de Contribuyentes del empleado
 *         telefono:
 *           type: string
 *           description: Número de teléfono del empleado
 *         create_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del empleado
 *         update_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *         delete_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación lógica del empleado
 *       example:
 *         id: 1
 *         nombre: "Maria"
 *         apellidos: "González"
 *         RFC: "LOPM800101ABC"
 *         telefono: "555-123-4567"
 *         create_at: "2024-10-10T08:30:00Z"
 *         update_at: null
 *         delete_at: null
 */

/**
 * @swagger
 * /api/empleados:
 *   get:
 *     summary: Obtiene todos los empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empleado'
 *       500:
 *         description: Error en el servidor
 * 
 *   post:
 *     summary: Crea un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       400:
 *         description: Datos inválidos en la solicitud
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/empleados/{id}:
 *   get:
 *     summary: Obtiene un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del empleado
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error en el servidor
 * 
 *   put:
 *     summary: Actualiza un empleado existente
 *     tags: [Empleados]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       400:
 *         description: Datos inválidos en la solicitud
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error en el servidor
 * 
 *   delete:
 *     summary: Elimina un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del empleado
 *     responses:
 *       200:
 *         description: Empleado eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Empleado eliminado exitosamente"
 *                 empleado:
 *                   $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: Empleado no encontrado o ya eliminado
 *       500:
 *         description: Error en el servidor
 */

import express from 'express';
import EmpleadoController from '../Controller/EmpleadoController.js';

const router = express.Router();

router.get('/empleados', EmpleadoController.getAllEmpleados);
router.post('/empleados', EmpleadoController.createEmpleado);
router.get('/empleados/:id', EmpleadoController.getEmpleadoById);
router.put('/empleados/:id', EmpleadoController.updateEmpleado);
router.delete('/empleados/:id', EmpleadoController.deleteEmpleado);

export default router;

