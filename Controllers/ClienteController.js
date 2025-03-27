import Cliente from '../models/ClienteModel.js';

class ClienteController {
  static async getAllClientes(req, res) {
    try {
        const clientes = await Cliente.findAll();
        res.json({
            message: "Lista de todos los Clientes",
            clientes: clientes
        });
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ error: error.message });
    }
}


static async createCliente(req, res) {
  try {
      const cliente = await Cliente.create(req.body);
      res.status(201).json({
          message: "Creado exitosamente el cliente",
          cliente: cliente
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}


  static async getClienteById(req, res) {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json({
            message: 'Cliente encontrado',
            cliente: cliente
        });
    } catch (error) {
        console.error('Error al obtener cliente por ID:', error);
        res.status(500).json({ error: error.message });
    }
}


static async updateCliente(req, res) {
  try {
    const cliente = await Cliente.update(req.params.id, req.body);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json({ message: 'Cliente actualizado' ,
      cliente: cliente
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

static async deleteCliente(req, res) {
  try {
    // Obtener el cliente antes de actualizarlo
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    // Llamar al método delete para actualizar el campo delete_at
    const clienteEliminado = await Cliente.delete(req.params.id);

    // Verificar si se ha actualizado correctamente
    if (!clienteEliminado) {
      return res.status(400).json({ message: 'No se pudo actualizar el cliente' });
    }

    // Devolver el cliente actualizado (con la fecha de eliminación)
    res.json({ message: 'Cliente eliminado', cliente: clienteEliminado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

}

export default ClienteController;
