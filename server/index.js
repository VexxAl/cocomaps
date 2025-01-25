const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas básicas
app.get("/", (req, res) => {
    res.send("¡Vamo COCOMAAAAAAAA!");
});

// Endpoint para comedores
app.use("/api/comedores", require("./routes/comedores"));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
