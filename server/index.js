const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors(
    {
      credentials: true,
      origin: ["https://cocomaps.com", "https://www.cocomaps.com", "http://localhost:3000", "http://31.97.240.242"],
      exposedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "USE", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      optionsSuccessStatus: 200
    }
));

app.use(express.json());

app.use("/api/comedores", require("./routes/comedores"));

app.get("/", (req, res) => {
  res.send("¡VAMOS COCOMAAAAP!");
});

module.exports = app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 API disponible en: http://localhost:${PORT}/api/comedores`);
});
