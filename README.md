# COCOMAPS 🍽️

## Mapa de Comedores Comunitarios de la Ciudad de Santa Fe

[![Sitio Web](https://img.shields.io/badge/Sitio%20Web-cocomaps.com-C86B28?style=flat-square)](https://cocomaps.com)
[![Estado](https://img.shields.io/badge/Estado-Operativo-6A994E?style=flat-square)]()
[![Programa](https://img.shields.io/badge/Programa-Eureka%202024-AC3F21?style=flat-square)](https://www.santafe.gob.ar/index.php/web/content/view/full/252187/(subtema)/251443)

> **"Donde la necesidad encuentra a la solidaridad"**
> Una plataforma digital que conecta comedores comunitarios con vecinos, optimizando la distribución de recursos alimentarios y fortaleciendo la red de contención social.

---

## 🎨 Nueva Identidad Visual (v2.0)

En nuestra última actualización, **COCOMAPS** evolucionó su diseño para reflejar mejor su misión. Dejamos atrás la estética institucional para abrazar una identidad **cálida, humana y cercana**.

* **Paleta "Guiso de Lentejas":** Utilizamos tonos tierra, terracota y crema (`#6E3B3B`, `#AC3F21`, `#FFF8E7`) que evocan el hogar, el alimento caliente y la materialidad de la construcción comunitaria.
* **Simbología:** El nuevo isotipo fusiona la estructura de una casa (refugio) con una cuchara (alimento), simbolizando que en estos espacios la comunidad encuentra ambas cosas.
* **UX Centrada en el Humano:** Mejoras de accesibilidad, contrastes altos para lectura fácil y navegación intuitiva en mapas.

---

## 🎯 Descripción del Proyecto

**COCOMAPS** centraliza la información de comedores comunitarios en un espacio digital accesible. La plataforma permite visualizar ubicación, horarios, responsables y necesidades específicas, facilitando la conexión entre:

* **Comedores** que necesitan visibilidad.
* **Donantes y Voluntarios** que quieren ayudar.
* **Vecinos** que requieren asistencia alimentaria.

### 🌟 Características Principales

* **🗺️ Mapa Interactivo**: Visualización georreferenciada con marcadores personalizados e intuitivos.
* **✨ UX Avanzada**: Navegación fluida con "Scroll-to-Top", manejo inteligente de zoom en mapas (Shift+Scroll) y diseño amigable.
* **📱 Diseño Responsive**: Optimizado para cualquier dispositivo, con soporte para PWA (Iconos adaptativos y Manifest).
* **🔍 Buscador Inteligente**: Filtros por nombre y dirección.
* **🚀 Infraestructura Robusta**: VPS dedicado, Nginx Reverse Proxy, y Base de Datos PostgreSQL.
* **🔐 Seguridad**: Certificados SSL, Headers de seguridad (CSP) y protección de endpoints.

---

## 🏗️ Arquitectura Técnica

### Frontend

* **Core**: React 19 (SPA)
* **Mapas**: React Leaflet + MapTiler / OpenStreetMap
* **Estilos**: CSS Modules con Variables Globales (Design System)
* **Diseño Gráfico**: Affinity Designer (Vectores SVG optimizados)

### Backend & Infraestructura

* **Servidor**: VPS KVM2 (Ubuntu)
* **API**: Node.js + Express
* **Process Manager**: PM2 (Cluster Mode)
* **Web Server**: Nginx (Reverse Proxy + Static Serving)
* **Base de Datos**: PostgreSQL 16
* **Deploy**: Pipeline manual optimizado con Git Hooks (Futuro: CI/CD)

---

## 🚀 Roadmap del Proyecto

### ✅ Fase 1: Cimientos y Despliegue (Completado)

* [x] Arquitectura base (Frontend + Backend + DB).
* [x] Despliegue en VPS y configuración de dominio.
* [x] Configuración de SSL y Seguridad básica.
* [x] Carga de datos iniciales (Mock data para pruebas).

### ✅ Fase 2: Identidad y Experiencia (Completado - Actual)

* [x] **Rebranding Total:** Nuevo logo, paleta de colores y favicon adaptativo (Dark/Light mode).
* [x] **Mejoras UX:** Fix de "Scroll Trap" en mapas, botón de retorno, feedback visual en tarjetas.
* [x] **SEO Técnico:** Open Graph tags para redes sociales, Manifest.json, Meta descriptions.
* [x] **Optimización:** Refactorización de assets a SVG y limpieza de código.

### 🚧 Fase 3: Gestión y Autonomía (Próximo Sprint)

El foco ahora es permitir que la comunidad gestione sus propios datos de forma segura.

* [ ] **Autenticación:** Implementación de Login para administradores (JWT).
* [ ] **Panel de Administración (Backoffice):** Interfaz ABM (Alta, Baja, Modificación) para gestionar comedores sin tocar código.
* [ ] **Automatización:** Backups automáticos de base de datos (Cronjobs) hacia almacenamiento externo.
* [ ] **Seguridad Avanzada:** Rate Limiting en API y Hardening de Nginx.

### 🔮 Fase 4: Expansión (Futuro)

* [ ] Integración con datos oficiales municipales en tiempo real.
* [ ] Sistema de validación de comedores mediante IA (Reconocimiento de fachadas).
* [ ] Módulo de donaciones directas.

---

## 🤝 Colaboración y Contacto

Tu interés y feedback son valiosos para hacer de COCOMAPS una herramienta más efectiva para la comunidad.

* **Responsable del Proyecto**: Valentín Alderete
* **Repositorio**: [GitHub](https://github.com/VexxAl/cocomaps)
* **Email**: [valentinalderete19@gmail.com](mailto:valentinalderete19@gmail.com)
* **Localidad**: Santa Fe de la Vera Cruz, Argentina

---

## 🏆 Reconocimientos

Este proyecto fue desarrollado en el marco del **Programa Eureka - Convocatoria 2024**, con el apoyo y financiamiento que hizo posible crear una herramienta profesional al servicio de la comunidad santafesina.

**COCOMAPS** - *Fortaleciendo la red de solidaridad comunitaria.*
