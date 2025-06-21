const scraper = require('./scraper');
const exportJSON = require('./exportJSON');
const exportCSV = require('./exportCSV');
const exportExcel = require('./exportExcel');
const exportTXT = require('./exportTXT');
const exportPDF = require('./exportPDF');

(async () => {
  console.log("Iniciando scraping de Mozilla Hacks...");
  const articulos = await scraper();

  console.log(`Artículos obtenidos: ${articulos.length}`);
  if (articulos.length === 0) {
    console.error("No se obtuvieron artículos. Revisa tus selectores.");
    return;
  }

  exportJSON(articulos);
  exportCSV(articulos);
  exportExcel(articulos);
  exportTXT(articulos);
  exportPDF(articulos);

  console.log("Archivos generados correctamente.");
})();
