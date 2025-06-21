const PDFDocument = require("pdfkit");
const fs = require("fs");

module.exports = (data) => {
  if (!data.length) {
    console.warn("⚠️ No hay datos para exportar a PDF.");
    return;
  }

  const doc = new PDFDocument({ margin: 30, size: "A4" });
  doc.pipe(fs.createWriteStream("articulos.pdf"));

  doc.fontSize(20).text("Artículos de Mozilla Hacks", { align: "center" });
  doc.moveDown();

  data.forEach((art, i) => {
    doc.fontSize(14).text(`Artículo ${i + 1}`, { underline: true });
    doc.fontSize(12).font("Helvetica-Bold").text(`Título: `).font("Helvetica").text(art.titulo);
    doc.font("Helvetica-Bold").text("Autor: ").font("Helvetica").text(art.autor);
    doc.font("Helvetica-Bold").text("Fecha: ").font("Helvetica").text(art.fecha);
    doc.font("Helvetica-Bold").text("Resumen: ").font("Helvetica").text(art.resumen);
    doc.font("Helvetica-Bold").text("URL: ").font("Helvetica").text(art.url);
    doc.font("Helvetica-Bold").text("Imagen: ").font("Helvetica").text(art.imagen || "No disponible");
    doc.moveDown();
  });

  doc.end();
};
