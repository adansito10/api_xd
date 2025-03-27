import Servicio from '../models/ServiciosModel.js';

class ServicioController {
    // Obtener todos los servicios
    static async getAllServicios(req, res) {
        try {
            const servicios = await Servicio.findAll();  // Asegúrate de que tu modelo tenga este método

            res.json({
                message: 'Lista de todos los servicios',
                servicios: servicios
            });
        } catch (error) {
            console.error('Error al obtener servicios:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Crear un nuevo servicio
    static async createServicio(req, res) {
        try {
            const { nombre_servicio, tipo_servicio, ubicacion, precio } = req.body;

            // Validación de campos requeridos
            if (!nombre_servicio || !tipo_servicio || !ubicacion || precio === undefined) {
                return res.status(400).json({ message: "Faltan datos requeridos: nombre_servicio, tipo_servicio, ubicacion, precio" });
            }

            // Crear el servicio en la base de datos
            const servicio = await Servicio.create({ nombre_servicio, tipo_servicio, ubicacion, precio });

            res.status(201).json({
                message: 'Servicio creado correctamente',
                servicio: servicio
            });
        } catch (error) {
            console.error('Error al crear servicio:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener un servicio por ID
    static async getServicioById(req, res) {
        try {
            const servicio = await Servicio.findById(req.params.id);  // Asegúrate de que tu modelo tenga este método
            if (!servicio) {
                return res.status(404).json({ message: "Servicio no encontrado" });
            }

            res.json({
                message: 'Servicio encontrado correctamente',
                servicio: servicio
            });
        } catch (error) {
            console.error('Error al obtener servicio por ID:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Actualizar un servicio
    static async updateServicio(req, res) {
        try {
            const servicio = await Servicio.update(req.params.id, req.body);  // Asegúrate de que tu modelo tenga este método

            if (!servicio) {
                return res.status(404).json({ message: 'Servicio no encontrado' });
            }

            res.json({
                message: 'Servicio actualizado correctamente',
                servicio: servicio
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Eliminar un servicio
    static async deleteServicio(req, res) {
        try {
            const servicio = await Servicio.findById(req.params.id);
            if (!servicio) {
                return res.status(404).json({ message: 'Servicio no encontrado' });
            }

            const result = await Servicio.delete(req.params.id);  // Asegúrate de que tu modelo tenga este método

            res.json({
                message: 'Servicio eliminado correctamente',
                servicio: servicio // Devolver el servicio antes de eliminarlo
            });
        } catch (error) {
            console.error('Error al eliminar servicio:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

export default ServicioController;
