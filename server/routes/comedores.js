const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Obtener todos los comedores (y ahora también buscar/filtrar)
router.get("/", async (req, res) => {
    // Tomamos el parámetro 'search' de la query
    const { search } = req.query; 

    // Definimos la condición WHERE
    let whereClause = "";
    let queryParams = [];

    if (search) {
        // Usamos ILIKE para búsqueda insensible a mayúsculas/minúsculas
        // Buscamos en nombre del comedor ó en la calle
        const searchTerm = `%${search}%`;
        queryParams.push(searchTerm, searchTerm);
        whereClause = `
            WHERE 
                c.nombre ILIKE $1 OR 
                d.calle ILIKE $2
        `;
    }

    try {
        const result = await pool.query(`
            SELECT 
                c.id, 
                c.nombre, 
                c.asociacion,
                c.telefono, 
                c.email, 
                c.web, 
                c.needs, 
                c.horario_lunes_a_viernes, 
                c.horario_sabado, 
                c.horario_domingo, 
                d.calle, 
                d.ciudad, 
                d.provincia, 
                d.distrito, 
                d.codigo_postal,
                d.coordenadas
            FROM comedores.comedor c
            JOIN locaciones.direcciones d ON c.direccion_id = d.id
            ${whereClause} 
            ORDER BY c.created_at DESC
        `, queryParams); // Pasamos los parámetros de forma segura
        
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener los comedores:", error);
        res.status(500).json({ error: "Error al obtener los comedores", details: error.message});
    }
});

// Actualizar coordenadas
router.post("/:id/update-coordinates", async (req, res) => {
    const { id } = req.params;
    const { coordinates } = req.body;
    try {
        await pool.query(
            "UPDATE locaciones.direcciones SET coordenadas = $1 WHERE id = $2",
            [coordinates, id]
        );
        res.status(200).json({ message: "Coordenadas actualizadas con éxito" });
    } catch (error) {
        console.error("Error al actualizar las coordenadas:", error);
        res.status(500).json({ error: "Error al actualizar las coordenadas" });
    }
});

module.exports = router;
