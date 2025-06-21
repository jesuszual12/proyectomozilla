const fs = require("fs");

module.exports = (data) => {
  if (!data.length) {
    console.warn("⚠️ No hay datos para exportar a TXT.");
    return;
  }

  let contenido = data.map((art, i) => {
    return [
      `Artículo ${i + 1}:`,
      `Título: ${art.titulo}`,
      `Autor: ${art.autor}`,
      `Fecha: ${art.fecha}`,
      `Resumen: ${art.resumen}`,
      `URL: ${art.url}`,
      `Imagen: ${art.imagen || "No disponible"}`,
      `-----------------------------`,
      ``,
    ].join("\n");
  }).join("\n");

  fs.writeFileSync("articulos.txt", contenido, "utf-8");
};
