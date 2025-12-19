// server.js
const express = require("express");
require("dotenv").config();
const path = require("path");

const app = express();

// Variables de entorno
const PORT = process.env.PORT || 8080;
const LOG_LEVEL = process.env.LOG_LEVEL || "info";

const orchestratorRoutes = require("./routes/orchestratorRoutes");

app.use(express.json());
app.use("/", orchestratorRoutes);

app.listen(PORT, () => {
  const serverUrl = `http://localhost:${PORT}`;
  console.log(`[ORCHESTRATOR] Servicio escuchando en ${serverUrl}`);
});
