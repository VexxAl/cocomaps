const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // Conexión a PostgreSQL

// Obtener todos los comedores
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM comedores.comedor ORDER BY created_at DESC");
        res.json(result.rows); // Enviar los datos como JSON
    } catch (error) {
        console.error("Error al obtener los comedores:", error);
        res.status(500).json({ error: "Error al obtener los comedores" });
    }
});

// // Agregar un nuevo comedor
// router.post("/", async (req, res) => {
//     const { name, location, needs } = req.body; // Extraer datos del cuerpo de la solicitud
//     try {
//         const result = await pool.query(
//             "INSERT INTO comedores (name, location, needs) VALUES ($1, $2, $3) RETURNING *",
//             [name, location, needs]
//         );
//         res.status(201).json(result.rows[0]); // Devolver el comedor creado
//     } catch (error) {
//         console.error("Error al agregar un comedor:", error);
//         res.status(500).json({ error: "Error al agregar un comedor" });
//     }
// });

// // Eliminar un comedor
// router.delete("/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//         await pool.query("DELETE FROM comedores WHERE id = $1", [id]);
//         res.status(200).json({ message: "Comedor eliminado con éxito" });
//     } catch (error) {
//         console.error("Error al eliminar un comedor:", error);
//         res.status(500).json({ error: "Error al eliminar un comedor" });
//     }
// });

module.exports = router;
