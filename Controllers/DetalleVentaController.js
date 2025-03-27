import DetalleVentaModel from '../models/DetalleVentaModel.js'; // Importa el modelo adaptado
import { generateTicketPDF, generatePDF } from '../config/PDFService.js'; // Importa los servicios de PDF

class DetalleVentasController {
    static async getAllDetalles(req, res) {
        try {
            const detalles = await DetalleVentaModel.getAllDetalles();
            res.json(detalles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createDetalleVenta(req, res) {
        try {
            const detalleVenta = await DetalleVentaModel.createDetalleVenta(req.body);
            res.status(201).json(detalleVenta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getDetalleById(req, res) {
        try {
            const detalleVenta = await DetalleVentaModel.getDetalleById(req.params.id);
            if (!detalleVenta) {
                return res.status(404).json({ message: "Detalle de venta no encontrado" });
            }
            res.json(detalleVenta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateDetalleVenta(req, res) {
        try {
            const detalleVenta = await DetalleVentaModel.updateDetalleVenta(req.params.id, req.body);
            if (!detalleVenta) {
                return res.status(404).json({ message: "Detalle de venta no encontrado" });
            }
            res.json({ message: 'Detalle de venta actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteDetalleVenta(req, res) {
        try {
            const detalleVenta = await DetalleVentaModel.deleteDetalleVenta(req.params.id);
            if (!detalleVenta) {
                return res.status(404).json({ message: "Detalle de venta no encontrado" });
            }
            res.json({ message: 'Detalle de venta eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async downloadAllDetalles(req, res) {
        try {
            const detalles = await DetalleVentaModel.getAllDetalles();
            const pdfBuffer = await generatePDF(detalles); // Genera PDF con detalles de todas las ventas
            res.setHeader('Content-Disposition', 'attachment; filename="detalles_ventas.pdf"');
            res.contentType("application/pdf");
            res.send(pdfBuffer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

  /*  static async downloadTicket(req, res) {
        try {
            const detalleVenta = await DetalleVentaModel.getDetalleById(req.params.id);
            if (!detalleVenta) {
                return res.status(404).json({ message: "Detalle de venta no encontrado" });
            }
            const pdfBuffer = await generateTicketPDF(detalleVenta); // Genera PDF en formato de ticket
            res.setHeader('Content-Disposition', 'attachment; filename="ticket_venta.pdf"');
            res.contentType("application/pdf");
            res.send(pdfBuffer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}*/}

export default DetalleVentasController;
