const { Parser } = require("json2csv");
const fs = require("fs");

module.exports = (data) => {
  if (!data.length) {
    console.warn("⚠️ No hay datos para exportar a CSV.");
    return;
  }
  const parser = new Parser();
  const csv = parser.parse(data);
  fs.writeFileSync("articulos.csv", csv, "utf-8");
};
