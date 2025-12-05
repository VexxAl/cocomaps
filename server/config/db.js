require("dotenv").config(); // Cargar variables de entorno primero

const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Tomar la variable de entorno
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false, 
});

module.exports = pool;
