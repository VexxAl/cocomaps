const fs = require('fs');
const path = require('path');
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

    // 1. Provincia y Localidad (Santa Fe - CP 3000)
    // Usamos ON CONFLICT DO NOTHING para no romper si corrés el script dos veces
    const provRes = await client.query(`
        INSERT INTO locaciones.provincias (nombre) VALUES ('Santa Fe') 
        ON CONFLICT (id) DO NOTHING 
        RETURNING id
    `);
    // Si ya existe, asumimos ID 1 (o buscamos el ID, pero simplificamos para el ejemplo)
    const provId = provRes.rows.length > 0 ? provRes.rows[0].id : 1; 

    // Insertar Localidad 3000
    await client.query(`
        INSERT INTO locaciones.localidades (cp, nombre, provincia_id) 
        VALUES (3000, 'Santa Fe Capital', $1)
        ON CONFLICT (cp) DO NOTHING
    `, [provId]);
    
    const localidadId = 3000;

    // 2. Encargado Genérico
    const dniGenerico = 11111111;
    await client.query(`
        INSERT INTO comedores.encargados (dni, nombre, apellido, telefono, email)
        VALUES ($1, 'Encargado', 'Generico', '000-0000', 'encargado@generico.com')
        ON CONFLICT (dni) DO NOTHING
    `, [dniGenerico]);

    const direccionRegex = /^([\w\s.ñÑáéíóúÁÉÍÓÚ]+)\s+(\d+)$/;
    // IDs reservados para carga manual (QA)
    const idsReservados = ['1', '2', '3']; 

    const results = [];
    const organizacionesMap = new Map();
    // Mapa para detectar direcciones duplicadas en esta misma ejecución
    const direccionesVistas = new Set(); 

    // Ruta al archivo CSV: ../../data/listado_comedores.csv relativo a este script (server/routes)
    const csvPathFinal = path.join(__dirname, '../../data/listado_comedores.csv');

    fs.createReadStream(csvPathFinal)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        
        let importados = 0;
        let ignorados = 0;
        let duplicados = 0;

        for (const row of results) {
          if (idsReservados.includes(row.No)) continue;

          const rawAddress = row.DIRECCIÓN ? row.DIRECCIÓN.trim() : '';
          
          // 1. Filtro Regex (Formato)
          const match = rawAddress.match(direccionRegex);
          if (!match) {
            ignorados++;
            continue;
          }

          const calle = match[1].trim();
          const altura = parseInt(match[2]);
          const keyDireccion = `${calle}-${altura}`;

          // 2. Filtro Duplicados
          if (direccionesVistas.has(keyDireccion)) {
            console.log(`Dirección repetida ignorada: ${rawAddress} (${row.COMEDOR})`);
            duplicados++;
            continue;
          }
          direccionesVistas.add(keyDireccion);

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
          importados++;
        }

        await client.query('COMMIT');
        console.log(`\n\nResumen de Importación:`);
        console.log(`- Importados: ${importados}`);
        console.log(`- Ignorados (Formato inválido): ${ignorados}`);
        console.log(`- Duplicados omitidos: ${duplicados}`);
        
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