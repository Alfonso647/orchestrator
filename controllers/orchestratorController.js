// controllers/orchestratorController.js
const { fetchAcquire, fetchPredict } = require("../services/orchestratorService");

/**
 * GET /health
 * Comprueba que el orquestador está activo
 */
function health(req, res) {
  res.json({
    status: "ok",
    service: "orchestrator"
  });
}

/**
 * POST /run
 * Ejecuta el flujo completo: Acquire → Predict
 */
async function run(req, res) {
  try {
    const acquireData = await fetchAcquire();

    const { dataId, features } = acquireData;

    if (!dataId || !Array.isArray(features)) {
      return res.status(502).json({ error: "Invalid response from Acquire" });
    }

    const predictData = await fetchPredict(features, dataId);

    const { predictionId, prediction, timestamp } = predictData;

    res.status(200).json({
      dataId,
      predictionId,
      prediction,
      timestamp
    });

  } catch (err) {
    console.error("Error en /run:", err);

    if (err.message.startsWith("ACQUIRE_BAD_STATUS") || err.message.startsWith("ACQUIRE_INVALID_RESULT")) {
      return res.status(502).json({ error: "Error desde Acquire" });
    }
    if (err.message.startsWith("PREDICT_BAD_STATUS") || err.message.startsWith("PREDICT_INVALID_RESULT")) {
      return res.status(502).json({ error: "Error desde Predict" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  health,
  run
};
