const puppeteer = require("puppeteer");

module.exports = async function scrapeMozilla() {
  const URL = "https://hacks.mozilla.org/";
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "domcontentloaded" });

  console.log("🕵️‍♂️ Extrayendo artículos...");

  const articulos = await page.evaluate(() => {
    const arregloArticulos = [];
    const resultados = document.querySelectorAll("li.list-item.row.listing");

    resultados.forEach((item) => {
      const titulo = item.querySelector("div.block--1 h3 a")?.innerText?.trim();
      const url = item.querySelector("div.block--1 h3 a")?.href;
      const resumen = item.querySelector("div.block--1 p")?.innerText?.trim();
      const autor = item.querySelector(".byline a")?.innerText?.trim() || "No disponible";
      const fecha = item.querySelector(".byline time")?.getAttribute("datetime") || "No disponible";
      const imagen = item.querySelector("div.block--3 img")?.src || "No disponible";

      if (titulo && url && resumen) {
        arregloArticulos.push({
          Titulo: titulo,
          URL: url,
          Resumen: resumen,
          Autor: autor,
          Fecha: fecha,
          Imagen: imagen
        });
      }
    });

    return arregloArticulos;
  });

  await browser.close();
  return articulos;
};
