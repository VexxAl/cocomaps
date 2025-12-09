# COCOMAPS 🍽️

## Mapa de Comedores Comunitarios de la Ciudad de Santa Fe

[![Sitio Web](https://img.shields.io/badge/Sitio%20Web-cocomaps.com-C86B28?style=flat-square)](https://cocomaps.com)
[![Estado](https://img.shields.io/badge/Estado-Producción-6A994E?style=flat-square)]()
[![Programa](https://img.shields.io/badge/Programa-Eureka%202024-AC3F21?style=flat-square)](https://www.santafe.gob.ar/index.php/web/content/view/full/252187/(subtema)/251443)

> **"Donde la necesidad encuentra a la solidaridad"**
> Una plataforma digital que conecta comedores comunitarios con vecinos, optimizando la distribución de recursos alimentarios y fortaleciendo la red de contención social.

---

## 🎨 Identidad Visual (v2.0)

**COCOMAPS** posee una identidad **cálida, humana y cercana**, diseñada para reflejar la materialidad de la ayuda social.

* **Paleta "Guiso de Lentejas":** Tonos tierra, terracota y crema (`#6E3B3B`, `#AC3F21`, `#FFF8E7`) que evocan el hogar y el alimento caliente.
* **Simbología:** Isotipo que fusiona la estructura de una casa (refugio) con una cuchara (alimento).
* **UX Centrada en el Humano:** Contrastes altos, navegación intuitiva y feedback visual claro.

---

## 🎯 Descripción del Proyecto

**COCOMAPS** centraliza la información de comedores comunitarios en un espacio digital accesible. La plataforma permite visualizar ubicación, horarios, responsables y necesidades específicas, facilitando la conexión entre comedores, donantes y vecinos.

### 🌟 Características Principales

* **🗺️ Mapa Interactivo**: Georreferenciación precisa con marcadores personalizados.
* **🔍 Buscador Inteligente**:
  * Filtrado instantáneo por nombre o calle.
  * Autocompletado y sugerencias en tiempo real.
  * Zoom automático al seleccionar un resultado.
* **✨ UX Avanzada**:
  * *Popups* automáticos al buscar.
  * Reset de vista inteligente al cerrar información.
  * Navegación fluida con "Scroll-to-Top".
* **📱 Diseño Responsive**: Optimizado para móviles y escritorio (PWA ready).
* **🚀 Infraestructura Robusta**: VPS dedicado, Nginx Reverse Proxy, PostgreSQL y SSL/TLS (HTTPS).

---

## 🏗️ Arquitectura Técnica

### Frontend

* **Core**: React 19 (SPA)
* **Mapas**: React Leaflet + MapTiler / OpenStreetMap
* **Estilos**: CSS Modules con Variables Globales (Design System)

### Backend & Infraestructura

* **Servidor**: VPS KVM2 (Ubuntu 24.04)
* **API**: Node.js + Express
* **Base de Datos**: PostgreSQL 16 (PostGIS ready)
* **Web Server**: Nginx (Reverse Proxy + Static Serving)
* **Process Manager**: PM2

---

## 🚀 Roadmap del Proyecto

### ✅ Fase 1: Cimientos y Despliegue (Completado)

* [x] Arquitectura base (Frontend + Backend + DB).
* [x] Configuración de VPS, Nginx y Dominio (`cocomaps.com`).
* [x] Implementación de SSL (HTTPS) con Let's Encrypt.

### ✅ Fase 2: Identidad y Experiencia (Completado)

* [x] **Rebranding:** Nueva identidad visual, logos y paleta de colores.
* [x] **Buscador Funcional:** Implementación de barra de búsqueda con *debounce* y dropdown de resultados.
* [x] **Interacción de Mapa:** Zoom dinámico, manejo de z-index y popups automáticos.
* [x] **SEO Técnico:** Open Graph tags, Manifest.json y meta descriptions.

### 🚧 Fase 3: Gestión de Datos y Autonomía (EN PROGRESO)

El foco actual es poblar la base de datos con información real y permitir la gestión autónoma.

* [ ] **Migración de Datos Masiva:** Procesamiento del padrón oficial (PDF) e inserción en base de datos PostgreSQL.
* [ ] **Panel de Administración (Backoffice):** Desarrollo de interfaz segura para dar de alta/baja/modificar comedores sin código.
* [ ] **Autenticación:** Sistema de Login (JWT) para administradores y colaboradores.
* [ ] **Seguridad Avanzada:** Rate Limiting en API y backups automáticos de BD.

### 🔮 Fase 4: Expansión (Futuro)

* [ ] Integración con APIs oficiales municipales (Datos Abiertos).
* [ ] Sistema de validación de identidad para comedores (IA/Reconocimiento).
* [ ] Módulo de donaciones directas y sistema de voluntariado.

---

## 🤝 Colaboración y Contacto

* **Responsable del Proyecto**: Valentín Alderete
* **Repositorio**: [GitHub](https://github.com/VexxAl/cocomaps)
* **Email**: [valentinalderete19@gmail.com](mailto:valentinalderete19@gmail.com)
* **Localidad**: Santa Fe de la Vera Cruz, Argentina

---

## 🏆 Reconocimientos

Proyecto desarrollado en el marco del **Programa Eureka - Convocatoria 2024**.

**COCOMAPS** - *Fortaleciendo la red de solidaridad comunitaria.*
