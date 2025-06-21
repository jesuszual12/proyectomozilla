const XLSX = require("xlsx");

module.exports = (data) => {
  if (!data.length) {
    console.warn("⚠️ No hay datos para exportar a Excel.");
    return;
  }
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Articulos");
  XLSX.writeFile(wb, "articulos.xlsx");
};
