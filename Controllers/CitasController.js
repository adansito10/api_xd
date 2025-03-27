import Cita from '../models/CitasModel.js';

class CitaController {
  static async getAllCitas(req, res) {
    try {
      const citas = await Cita.findAll();
      // Agregar el mensaje junto con las citas
      res.json({
        message: "Lista de todas las Citas", // Mensaje de éxito
        data: citas // Lista de citas encontradas
      });
    } catch (error) {
      console.error('Error al obtener citas:', error);
      res.status(500).json({ error: error.message });
    }
  }
  

  static async createCita(req, res) {
    try {
      const cita = await Cita.create(req.body); // Crea la cita
      res.status(201).json({
        message: "Cita Creada exitosamente", // Mensaje adicional
        data: cita // Datos de la cita creada
      });
    } catch (error) {
      console.error('Error al crear cita:', error);
      res.status(500).json({ error: error.message });
    }
  }
  

  static async getCitaById(req, res) {
    try {
      const cita = await Cita.findById(req.params.id);
      if (!cita) {
        return res.status(404).json({ message: "Cita no encontrada" });
      }
      // Agregar el mensaje "Cita encontrada" junto con los datos de la cita
      return res.json({
        message: "Cita encontrada", // Mensaje de éxito
        data: cita // Datos de la cita encontrada
      });
    } catch (error) {
      console.error('Error al obtener cita por ID:', error);
      res.status(500).json({ error: error.message });
    }
  }
  

  static async updateCita(req, res) {
    try {
      const cita = await Cita.update(req.params.id, req.body);
      if (!cita) {
        return res.status(404).json({ message: 'Cita no encontrada' });
      }
      // Devolver la cita actualizada junto con el mensaje
      res.json({
        message: 'Cita actualizada',
        data: cita // Incluye los datos de la cita actualizada
      });
    } catch (error) {
      console.error('Error al actualizar cita:', error);
      res.status(500).json({ error: error.message });
    }
  }
  
  static async deleteCita(req, res) {
    try {
      // Primero obtenemos la cita antes de eliminarla
      const cita = await Cita.findById(req.params.id);
      
      if (!cita) {
        return res.status(404).json({ message: 'Cita no encontrada' });
      }
      
      // Ahora procedemos con la eliminación
      const result = await Cita.delete(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Error al eliminar la cita' });
      }
      
      // Devolvemos la cita eliminada junto con el mensaje
      res.json({
        message: 'Cita eliminada',
        data: cita // Incluimos la cita que fue eliminada
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}  

export default CitaController;
