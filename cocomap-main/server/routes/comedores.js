const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // Conexión a PostgreSQL

// Obtener todos los comedores
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                c.id, 
                c.nombre, 
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
                d.codigo_postal,
                d.coordenadas
            FROM comedores.comedor c
            JOIN locaciones.direcciones d ON c.direccion_id = d.id
            ORDER BY c.created_at DESC
        `);
        res.json(result.rows); // Enviar los datos como JSON
    } catch (error) {
        console.error("Error al obtener los comedores:", error);
        res.status(500).json({ error: "Error al obtener los comedores" });
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