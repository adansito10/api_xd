import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';

export async function generatePDF(ventas) {
    try {
        const pdfDoc = await PDFDocument.create();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        let page = pdfDoc.addPage([600, 800]);
        const { height } = page.getSize();
        let yPosition = height - 50;

        ventas.forEach((venta) => {
            const monto = (typeof venta.monto === 'number' && !isNaN(venta.monto)) 
                          ? venta.monto.toFixed(2) 
                          : "Monto no disponible";

            page.drawText(`ID: ${venta.idVenta}`, { x: 50, y: yPosition, size: 12, font });
            page.drawText(`Monto: $${monto}`, { x: 150, y: yPosition, size: 12, font });

            const fecha = venta.update_at ? new Date(venta.update_at).toLocaleString() : 'Fecha no disponible';
            page.drawText(`Fecha: ${fecha}`, { x: 250, y: yPosition, size: 12, font });

            yPosition -= 20;
            if (yPosition <= 50) {
                page = pdfDoc.addPage([600, 800]);
                yPosition = height - 50;
            }
        });

        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync('./Reporte.pdf', pdfBytes);  // Ruta donde se guarda el archivo PDF
        console.log("PDF generado correctamente.");
    } catch (error) {
        console.error("Error al generar el PDF:", error);
        throw new Error("Error al generar el PDF");
    }
}
