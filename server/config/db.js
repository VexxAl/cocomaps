const { Pool } = require("pg");

// Claramente no te voy a pasar mis datos, pirata.
const pool = new Pool({
    user: "tu_usuario", // Cambiar por tu usuario
    host: "localhost",
    database: "cocomap",
    password: "tu_contraseña", // Cambiar por tu contraseña
    port: 5432,
});

module.exports = pool;
