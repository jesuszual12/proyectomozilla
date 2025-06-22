const PDFDocument = require('pdfkit');
const fs = require('fs');

/**
 * Exporta un arreglo de artículos a un archivo PDF.
 * @param {Array<Object>} articulos - Arreglo de objetos, donde cada objeto es un artículo.
 * @param {string} filename - Nombre del archivo de salida (por defecto 'articulos.pdf').
 */
async function exportToPDF(articulos, filename = 'articulos.pdf') {
    const doc = new PDFDocument({ margin: 50 }); // Ajusta los márgenes según sea necesario
    doc.pipe(fs.createWriteStream(filename));

    doc.fontSize(28)
       .font('Helvetica-Bold')
       .text('Artículos de Mozilla Hacks', { align: 'center' });
    doc.moveDown(1.5);

    articulos.forEach((articulo, index) => {
        // Título del Artículo
        doc.fontSize(18)
           .font('Helvetica-Bold')
           .text(`${index + 1}. ${articulo.Titulo || 'Sin título'}`, { continued: false });
        doc.moveDown(0.5);

        // URL y Fecha
        doc.fontSize(10)
           .font('Helvetica')
           .text(`URL: `, { continued: true })
           .fillColor('blue')
           .text(articulo.URL || 'N/A', { link: articulo.URL, underline: true, continued: false })
           .fillColor('black'); 

        doc.fontSize(10)
           .font('Helvetica')
           .text(`Fecha: ${articulo.Fecha || 'N/A'}`, { continued: false });
        doc.moveDown(0.3);

        // Autor
        doc.fontSize(12)
           .font('Helvetica-Oblique')
           .text(`Autor: ${articulo.Autor || 'Desconocido'}`, { continued: false });
        doc.moveDown(1);

        // Resumen
        doc.fontSize(11)
           .font('Helvetica')
           .text('Resumen:', { continued: false, underline: true });
        doc.moveDown(0.2);
        doc.fontSize(10)
           .font('Helvetica')
           .text(articulo.Resumen || 'No hay resumen disponible.', { align: 'justify' });
        doc.moveDown(1);

        // Imágenes
        doc.fontSize(11)
           .font('Helvetica')
           .text('Imágenes Destacadas:', { continued: false, underline: true });
        doc.moveDown(0.2);
        if (Array.isArray(articulo.Imagenes) && articulo.Imagenes.length > 0) {
            articulo.Imagenes.forEach((imgSrc) => {
                doc.fontSize(9)
                   .font('Helvetica')
                   .text(`- ${imgSrc}`, { continued: false });
            });
        } else {
            doc.fontSize(9)
               .font('Helvetica')
               .text(`- ${articulo.Imagenes || 'No se encontraron imágenes.'}`, { continued: false });
        }
        doc.moveDown(2); 

        if (doc.y > doc.page.height - 150 && index < articulos.length - 1) {
            doc.addPage();
            doc.fontSize(28)
               .font('Helvetica-Bold')
               .text('Artículos de Mozilla Hacks (Continuación)', { align: 'center' });
            doc.moveDown(1.5);
        }
    });

    doc.end();
    console.log(`✅ Archivo '${filename}' generado exitosamente.`);
}

module.exports = exportToPDF;