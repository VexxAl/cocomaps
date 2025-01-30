const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors(
    {
      credentials: true,
      origin: ["https://cocomap.vercel.app"],
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