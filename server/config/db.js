const { Pool } = require("pg");

// Claramente no te voy a pasar mis datos, pirata.
const pool = new Pool({
    user: "vex_al", // Cambiar por tu usuario
    host: "127.0.0.1",
    database: "cocomap",
    password: "190104", // Cambiar por tu contraseña
    port: 5432,
});

module.exports = pool;