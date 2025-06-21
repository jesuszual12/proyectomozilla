const fs = require("fs");

module.exports = (data) => {
  fs.writeFileSync("articulos.json", JSON.stringify(data, null, 2), "utf-8");
};