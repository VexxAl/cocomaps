const fs = require('fs');
const { Pool } = require('pg');
const csv = require('csv-parser');

// CONFIGURACIÓN LOCAL
const pool = new Pool({
  user: 'vex_al',
  host: 'localhost',
  database: 'cocomaps_develop',
  password: 'dejamepasarporfa', 
  port: 5432,
});

async function importar() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    console.log("Iniciando Importación...");

    // 1. Crear Provincia y Localidad (Santa Fe - CP 3000)
    const provRes = await client.query(`
        INSERT INTO locaciones.provincias (nombre) VALUES ('Santa Fe') RETURNING id
    `);
    const provId = provRes.rows[0].id;

    // AHORA INSERTAMOS EL CP MANUALMENTE (3000)
    await client.query(`
        INSERT INTO locaciones.localidades (cp, nombre, provincia_id) 
        VALUES (3000, 'Santa Fe Capital', $1)
    `, [provId]);
    
    const localidadId = 3000; // Lo guardamos en variable para usarlo abajo

    // 2. Crear Encargado Genérico (DNI Ficticio)
    // Usamos 11111111 como DNI dummy
    const dniGenerico = 11111111;
    await client.query(`
        INSERT INTO comedores.encargados (dni, nombre, apellido, telefono, email)
        VALUES ($1, 'Encargado', 'Generico', '000-0000', 'encargado@generico.com')
    `, [dniGenerico]);

    // Regex para separar calle y altura
    const direccionRegex = /^([\w\s.ñÑáéíóúÁÉÍÓÚ]+)\s+(\d+)$/;
    const idsReservados = ['1', '2', '3']; 

    const results = [];
    const organizacionesMap = new Map();

    fs.createReadStream('../cocomaps/data/listado_comedores.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        
        for (const row of results) {
          if (idsReservados.includes(row.No)) continue;

          const rawAddress = row.DIRECCIÓN ? row.DIRECCIÓN.trim() : '';
          const match = rawAddress.match(direccionRegex);

          if (!match) continue;

          const calle = match[1].trim();
          const altura = parseInt(match[2]);
          const nombreOrg = row.ASOCIACIÓN ? row.ASOCIACIÓN.trim() : 'SIN ASOCIACIÓN';
          const distrito = row.DISTRITO || 'Desconocido';
          const asistidos = parseInt(row['PERSONAS ASISTIDAS']) || 0;

          // A. Organización
          let orgId = organizacionesMap.get(nombreOrg);
          if (!orgId) {
            const orgCheck = await client.query("SELECT id FROM comedores.organizaciones WHERE nombre = $1", [nombreOrg]);
            if (orgCheck.rows.length > 0) {
                orgId = orgCheck.rows[0].id;
            } else {
                const newOrg = await client.query(
                    "INSERT INTO comedores.organizaciones (nombre, tipo) VALUES ($1, 'Organización Social') RETURNING id",
                    [nombreOrg]
                );
                orgId = newOrg.rows[0].id;
            }
            organizacionesMap.set(nombreOrg, orgId);
          }

          // B. Dirección
          const dirRes = await client.query(`
            INSERT INTO locaciones.direcciones (calle, altura, distrito, localidad_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id
          `, [calle, altura, distrito, localidadId]);
          
          const direccionId = dirRes.rows[0].id;

          // C. Comedor
          await client.query(`
            INSERT INTO comedores.comedor 
            (nombre, direccion_id, encargado_id, organizacion_id, personas_asistidas)
            VALUES ($1, $2, $3, $4, $5)
          `, [row.COMEDOR, direccionId, dniGenerico, orgId, asistidos]);
          
          process.stdout.write('.'); 
        }

        await client.query('COMMIT');
        console.log("\nMigración Local Finalizada!");
        client.release();
        pool.end();
      });

  } catch (e) {
    await client.query('ROLLBACK');
    console.error("Error:", e);
    client.release();
    pool.end();
  }
}

importar();