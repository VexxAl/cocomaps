const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Obtener todos los comedores con su organización y dirección detallada
router.get("/", async (req, res) => {
    const { search } = req.query; 

    let whereClause = "";
    let queryParams = [];

    if (search) {
        const searchTerm = `%${search}%`;
        queryParams.push(searchTerm, searchTerm, searchTerm);
        // Ahora buscamos en el nombre del comedor, la calle o la organización
        whereClause = `
            WHERE 
                c.nombre ILIKE $1 OR 
                d.calle ILIKE $2 OR
                o.nombre ILIKE $3
        `;
    }

    try {
        const result = await pool.query(`
            SELECT 
                c.id, 
                c.nombre, 
                o.nombre AS organizacion, -- Traemos el nombre de la organización vinculada
                c.telefono_contacto, 
                c.needs, 
                c.personas_asistidas,
                c.horarios_apertura,
                d.calle, 
                d.altura, -- Nueva columna separada
                d.distrito, 
                d.lat, 
                d.lng
            FROM comedores.comedor c
            JOIN locaciones.direcciones d ON c.direccion_id = d.id
            LEFT JOIN comedores.organizaciones o ON c.organizacion_id = o.id -- Join con organizaciones
            ${whereClause} 
            ORDER BY c.created_at DESC
        `, queryParams);
        
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener los comedores:", error);
        res.status(500).json({ error: "Error al obtener los comedores", details: error.message});
    }
});

// Actualizar coordenadas (Lat/Lng separadas)
router.post("/:id/update-coordinates", async (req, res) => {
    const { id } = req.params; // ID del comedor
    const { lat, lng } = req.body; // esperamos lat y lng por separado

    try {
        // Primero buscamos el direccion_id asociado a ese comedor
        const comedorResult = await pool.query(
            "SELECT direccion_id FROM comedores.comedor WHERE id = $1",
            [id]
        );

        if (comedorResult.rows.length === 0) {
            return res.status(404).json({ error: "Comedor no encontrado" });
        }

        const direccionId = comedorResult.rows[0].direccion_id;

        // Actualizamos las columnas lat y lng en la tabla de direcciones
        await pool.query(
            "UPDATE locaciones.direcciones SET lat = $1, lng = $2 WHERE id = $3",
            [lat, lng, direccionId]
        );

        res.status(200).json({ message: "Coordenadas actualizadas con éxito en el mapa" });
    } catch (error) {
        console.error("Error al actualizar las coordenadas:", error);
        res.status(500).json({ error: "Error al actualizar las coordenadas", details: error.message });
    }
});

module.exports = router;
