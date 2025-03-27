import * as VentaModel from '../models/VentaModel.js';
import { generatePDF } from '../config/PDFService.js';

export default class VentasController {
    static async getAll(req, res) {
        try {
            const ventas = await VentaModel.getAllVentas();
            res.json(ventas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const venta = await VentaModel.getVentaById(id);
            if (!venta) return res.status(404).json({ message: "Venta no encontrada" });
            res.json(venta);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async create(req, res) {
        try {
            const venta = await VentaModel.createVenta(req.body);
            res.status(201).json({ message: 'Venta creada correctamente', venta });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async update(req, res) {
        try {
            const venta = await VentaModel.updateVenta(req.params.id, req.body);
            if (!venta) return res.status(404).json({ message: 'Venta no encontrada' });
            res.json({ message: 'Venta actualizada correctamente', venta });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const result = await VentaModel.deleteVenta(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getReporte(req, res) {
        try {
            const ventas = await VentaModel.getAllVentas(); // Recupera todas las ventas
            if (!ventas || ventas.length === 0) {
                return res.status(404).json({ message: "No hay ventas registradas" });
            }
    
            const pdfBuffer = await generatePDF(ventas); // Generar el PDF
            res.setHeader('Content-Disposition', 'attachment; filename="reporte_ventas.pdf"');
            res.contentType("application/pdf");
            res.send(pdfBuffer);
        } catch (error) {
            console.error("Error al generar el reporte de ventas:", error); // Registro detallado
            res.status(500).json({ message: "Error al generar el reporte de ventas", error: error.message });
        };
    };
    
};

