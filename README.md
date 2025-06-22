# Proyecto de Scraping de Mozilla Hacks

## Equipo
- Jose de Jesus Zuñiga Alarcon
- Kevin Jesus Badillo Diaz
- Irving Cruz Chavez

---

## Descripción del proyecto

Este repositorio contiene un scraper desarrollado en Node.js que extrae información relevante de los artículos publicados en la página principal de [Mozilla Hacks](https://hacks.mozilla.org/). El objetivo es automatizar la recolección de datos como el título, resumen, autor, fecha de publicación, URL e imagen destacada de cada artículo, y exportarlos en varios formatos útiles para análisis o consulta.

El proyecto está organizado en módulos para facilitar el mantenimiento y la extensión del código. Los datos extraídos se pueden guardar en archivos JSON, CSV, Excel, TXT y PDF, permitiendo así diferentes formas de visualización y procesamiento.

## Instrucciones de instalación y uso

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/jesuszual12/proyectomozilla.git](https://github.com/jesuszual12/proyectomozilla.git)
    cd proyectomozilla
    ```

2.  **Instalar las dependencias:**
    ```bash
    npm install
    npm install pdfkit
    ```

3.  **Ejecutar el scraper:**
    ```bash
    npm start
    ```
    o directamente:
    ```bash
    node index.js
    ```

4.  **Archivos generados:**
    Al finalizar la ejecución, los archivos con los datos extraídos se guardarán en la carpeta principal del proyecto:
    - `articulos.json`
    - `articulos.csv`
    - `articulos.xlsx`
    - `articulos.txt`
    - `articulos.pdf`

## Estructura del proyecto

-   `index.js`: Archivo principal que coordina el scraping y la exportación.
-   `scraper.js`: Módulo para extraer los datos de la web.
-   `exportJSON.js`, `exportCSV.js`, `exportExcel.js`, `exportTXT.js`, `exportPDF.js`: Módulos para exportar los datos en diferentes formatos.
-   `img/`: Carpeta que contiene las imágenes de la documentación.
-   `Archivos generados`: Los archivos de salida con los datos extraídos (mencionados arriba).
-   `Readme.md`: Este archivo con la documentación del proyecto.

## Ejemplo de ejecución

A continuación se muestra una captura de pantalla de la ejecución del scraper y los archivos generados:

### Consola de ejecución
![Ejecución del scraper](./img/ejecucion.png)

### Archivos de salida
![Archivos generados](./img/estructura.png)

---

Este proyecto fue realizado como parte de una actividad académica de Web Scraping, aplicando conocimientos de JavaScript y Node.js para la automatización y procesamiento de información desde la web.