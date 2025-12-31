const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Obtener todos los comedores
router.get("/", async (req, res) => {
    const { search } = req.query; 

    let whereClause = "";
    let queryParams = [];

    if (search) {
        const searchTerm = `%${search}%`;
        queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
        whereClause = `
            WHERE 
                c.nombre ILIKE $1 OR 
                d.calle ILIKE $2 OR
                o.nombre ILIKE $3 OR
                l.nombre ILIKE $4
        `;
    }

    try {
        const result = await pool.query(`
            SELECT 
                c.id, 
                c.nombre, 
                o.nombre AS organizacion, 
                c.telefono_contacto AS telefono,
                c.needs, 
                c.personas_asistidas,
                c.horarios_apertura,
                d.calle, 
                d.altura, 
                d.distrito, 
                d.lat, 
                d.lng,
                l.nombre AS localidad,    -- TRAEMOS LA LOCALIDAD (Ej: Santa Fe Capital)
                p.nombre AS provincia     -- TRAEMOS LA PROVINCIA (Ej: Santa Fe)
            FROM comedores.comedor c
            JOIN locaciones.direcciones d ON c.direccion_id = d.id
            JOIN locaciones.localidades l ON d.localidad_id = l.cp       -- Join con Localidad
            JOIN locaciones.provincias p ON l.provincia_id = p.id        -- Join con Provincia
            LEFT JOIN comedores.organizaciones o ON c.organizacion_id = o.id
            ${whereClause} 
            ORDER BY c.created_at DESC
        `, queryParams);
        
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener los comedores:", error);
        res.status(500).json({ error: "Error al obtener los comedores", details: error.message});
    }
});

// Actualizar coordenadas
router.post("/:id/update-coordinates", async (req, res) => {
    const { id } = req.params; 
    const { lat, lng } = req.body; 

    try {
        const comedorResult = await pool.query("SELECT direccion_id FROM comedores.comedor WHERE id = $1", [id]);
        if (comedorResult.rows.length === 0) return res.status(404).json({ error: "Comedor no encontrado" });

        const direccionId = comedorResult.rows[0].direccion_id;
        await pool.query("UPDATE locaciones.direcciones SET lat = $1, lng = $2 WHERE id = $3", [lat, lng, direccionId]);

        res.status(200).json({ message: "Coordenadas actualizadas" });
    } catch (error) {
        console.error("Error al actualizar coordenadas:", error);
        res.status(500).json({ error: "Error interno" });
    }
});

module.exports = router;