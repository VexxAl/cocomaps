const { Pool } = require("pg");

// Claramente no te voy a pasar mis datos, pirata.
const pool = new Pool({
    user: "avnadmin",
    host: "pg-182caa88-agusmarzioni24-366d.b.aivencloud.com",
    database: "defaultdb",
    password: "AVNS_fEzoRDOEpitlExAOcDs",
    port: 27264,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;