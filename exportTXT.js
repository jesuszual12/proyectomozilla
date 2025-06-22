const fs = require('fs');

/**
 * Exporta un arreglo de artículos a un archivo de texto plano.
 * @param {Array<Object>} articulos - Arreglo de objetos, donde cada objeto es un artículo.
 * @param {string} filename - Nombre del archivo de salida (por defecto 'articulos.txt').
 */
async function exportToTXT(articulos, filename = 'articulos.txt') {
    let txtContent = '';

    articulos.forEach((articulo, index) => {
        txtContent += `--- Artículo ${index + 1} ---\n`;
        txtContent += `Título: ${articulo.Titulo || 'N/A'}\n`;
        txtContent += `URL: ${articulo.URL || 'N/A'}\n`;
        txtContent += `Fecha: ${articulo.Fecha || 'N/A'}\n`;
        txtContent += `Autor: ${articulo.Autor || 'N/A'}\n`;
        txtContent += `Resumen:\n${articulo.Resumen || 'N/A'}\n`;
        txtContent += `Imágenes Destacadas:\n`;
        if (Array.isArray(articulo.Imagenes) && articulo.Imagenes.length > 0) {
            articulo.Imagenes.forEach((img, imgIndex) => {
                txtContent += `  - ${img}\n`;
            });
        } else {
            txtContent += `  ${articulo.Imagenes || 'No se encontraron imágenes.'}\n`;
        }
        txtContent += '\n\n'; 
    });

    try {
        await fs.promises.writeFile(filename, txtContent, 'utf8');
        console.log(`✅ Archivo '${filename}' generado exitosamente.`);
    } catch (error) {
        console.error(`❌ Error al generar el archivo '${filename}':`, error);
    }
}

module.exports = exportToTXT;