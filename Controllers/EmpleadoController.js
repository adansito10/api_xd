import Empleado from '../models/EmpleadosModel.js';

class EmpleadoController {
    // Obtener todos los empleados
    static async getAllEmpleados(req, res) {
        try {
            const empleados = await Empleado.findAll();
            res.json({
                message: 'Lista de todos los empleados',
                empleados: empleados
            });
        } catch (error) {
            console.error('Error al obtener empleados:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Crear un nuevo empleado
    static async createEmpleado(req, res) {
        try {
            const { nombre, RFC, telefono, apellidos } = req.body;
            const empleado = await Empleado.create({ nombre, RFC, telefono, apellidos });
            res.status(201).json({
                message: 'Empleado creado correctamente',
                empleado: empleado
            });
        } catch (error) {
            console.error('Error al crear empleado:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener un empleado por ID
    static async getEmpleadoById(req, res) {
        try {
            const empleado = await Empleado.findById(req.params.id);
            if (!empleado) {
                return res.status(404).json({ message: "Empleado no encontrado" });
            }
            res.json({
                message: 'Empleado encontrado correctamente',
                empleado: empleado
            });
        } catch (error) {
            console.error('Error al obtener empleado por ID:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Actualizar un empleado
    static async updateEmpleado(req, res) {
        try {
            const empleado = await Empleado.update(req.params.id, req.body);
            if (!empleado) {
                return res.status(404).json({ message: 'Empleado no encontrado' });
            }
            res.json({
                message: 'Empleado actualizado correctamente',
                empleado: empleado
            });
        } catch (error) {
            console.error('Error al actualizar empleado:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Eliminar un empleado de forma lógica
    static async deleteEmpleado(req, res) {
        try {
            const result = await Empleado.delete(req.params.id);
            if (result.message === 'Empleado no encontrado o ya eliminado') {
                return res.status(404).json(result);
            }
            res.json({
                message: result.message,
                empleado: result.empleado
            });
        } catch (error) {
            console.error('Error al eliminar empleado:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

export default EmpleadoController;
