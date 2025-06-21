const puppeteer = require("puppeteer");

module.exports = async function scrapeMozilla() {
  const URL = "https://hacks.mozilla.org/";
  const browser = await puppeteer.launch({ headless: true, slowMo: 300 });
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "domcontentloaded" });

  console.log("🕵️‍♂️ Extrayendo artículos...");

  // Titulo, url, resumen y fecha
  const articulos = await page.evaluate(() => {
    const arregloArticulos = [];
    const resultados = document.querySelectorAll("li.list-item.row.listing");
    resultados.forEach((item) => {
      const titulo = item.querySelector("div.block--1 h3 a")?.innerText?.trim();
      const url = item.querySelector("div.block--1 h3 a")?.href;
      const resumen = item.querySelector("div.block--1 p")?.innerText?.trim();
      const fecha = item.querySelector("div.post__meta abbr")?.innerText;

      // Validar datos
      if (titulo && url && resumen && fecha) {
        arregloArticulos.push({
          Titulo: titulo,
          URL: url,
          Resumen: resumen,
          Fecha: fecha
        });
      }
    });
    return arregloArticulos;
  });

 // Dar click en cada articulo para obtener autor e imagenes destacadas
  for (let articulo of articulos) {
    await page.goto(articulo.URL, { waitUntil: "domcontentloaded" });

    const { Autor, Imagenes } = await page.evaluate(() => {
      const autor = document.querySelector("a.url")?.innerText?.trim() || null;
      const imagenes = Array.from(document.querySelectorAll("article img"))
        .map(img => img.getAttribute("src"))
        .filter(src => !!src);
      return { Autor: autor, Imagenes: imagenes };
    });

    articulo.Autor = Autor;
    articulo.Imagenes = Imagenes.length > 0 ? Imagenes : "No se encontraron imagenes en este articulo";
  }

  await browser.close();
  return articulos;
};
