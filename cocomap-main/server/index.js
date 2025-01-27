const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;

// Configurar CORS
app.use(cors({
    origin: "http://localhost:3000", // Dirección del frontend
    methods: ["GET", "POST", "DELETE"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"] // Encabezados permitidos
}));

// Middleware para manejar datos JSON
app.use(bodyParser.json());

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("VAMO COCOMAAAAAA!!!!!");
});

// Rutas de API
app.use("/api/comedores", require("./routes/comedores"));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});