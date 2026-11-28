# Automax - Sitio Web de Renta de Vehículos

Proyecto Integrador del Segundo Parcial de la materia **Desarrollo Basado en Plataformas** (Ingeniería en Computación, UACH).

## Integrantes del Equipo
* Carlos Ubaldo Dominguez Valles - 367633
* Daniel Emiliano Jiménez Frade - 376976
* Juan David Rocha Montelongo - 367910

## Descripción General
Aplicación web desarrollada con **Node.js** nativo, **HTML5**, **CSS3** propio (sin frameworks) y **JavaScript** para la empresa de renta de automóviles **Automax**. Permite consultar un catálogo de 25 vehículos, visualizar las especificaciones detalladas de los primeros tres modelos, conocer la identidad de la empresa y enviar solicitudes de contacto que se almacenan en el servidor.

## Funcionamiento del Sitio
* **Servidor HTTP (`server.js`):** Escucha en el puerto `8888`, despacha archivos estáticos (HTML, CSS, JS e imágenes) y procesa peticiones `POST` en la ruta `/enviar-contacto`, guardando cada registro en `data/contactos.txt`.
* **Página Principal (`index.html`):** Muestra la presentación de Automax y el catálogo de 25 vehículos con marca, modelo, año y precio de renta por día.
* **Detalle de Vehículos (`auto1.html`, `auto2.html`, `auto3.html`):** Presentan ficha técnica, precio e imagen de los 3 primeros vehículos del catálogo.
* **Acerca de Nosotros (`nosotros.html`):** Historia, misión, visión y valores de Automax.
* **Contacto (`contacto.html`):** Ubicación, teléfonos, horarios y formulario funcional conectado al servidor.

## Instrucciones para Ejecutar Localmente
1. Clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd automax-web
   ```
2. Iniciar el servidor con Node.js:
   ```bash
   node server.js
   ```
3. Abrir el navegador en `http://localhost:8888`.

## Instrucciones para Ejecutar con Docker
1. Descargar la imagen pública desde Docker Hub:
   ```bash
   docker pull <TU_USUARIO_DOCKERHUB>/automax:latest
   ```
2. Ejecutar el contenedor mapeando el puerto `8888`:
   ```bash
   docker run -d -p 8888:8888 --name automax-app <TU_USUARIO_DOCKERHUB>/automax:latest
   ```
3. Abrir `http://localhost:8888` en el navegador.

## Enlace a Docker Hub
* Imagen pública: `https://hub.docker.com/r/<TU_USUARIO_DOCKERHUB>/automax`
