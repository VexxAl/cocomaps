# COCOMAPS

Mapa de Comedores Comunitarios de la Ciudad de Santa Fe

## 🚀 Quick Start

```bash
# Clonar repositorio
git clone https://github.com/VexxAl/cocomaps.git
cd cocomaps

# Configurar entorno
cp .env.example .env
cd server && cp .env.example .env && cd ..

# Instalar dependencias
npm install
cd server && npm install && cd ..

# Configurar base de datos (PostgreSQL)
psql -U postgres < server/SQL/creacion.sql
psql -U postgres cocomaps_db < server/SQL/insercion.sql

# Iniciar frontend (puerto 3000)
npm start

# Iniciar backend (puerto 3001, otra terminal)
cd server && npm start
```

## 📦 Dependencias Principales

**Frontend:**
- React 19.0.0
- Leaflet 1.9.4 (Mapas)
- Axios 1.8.2
- React Router 7.6.0

**Backend:**
- Express 4.21.2
- PostgreSQL (pg 8.13.1)
- CORS 2.8.5
- dotenv 16.4.7

## 🔧 Requisitos

- Node.js v14+
- PostgreSQL
- npm o yarn

## 📚 Documentación Completa

Ver [README.md](./README.md) para más detalles

## 🤝 Contribuir

Ver [CONTRIBUTING.md](./CONTRIBUTING.md)

---

[cocomaps.com](https://cocomaps.com) | [@VexxAl](https://github.com/VexxAl)
