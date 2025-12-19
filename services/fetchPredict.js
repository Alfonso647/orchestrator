// services/fetchPredict.js
const PREDICT_URL = "http://localhost:3002/predict"; 

/**
 * Llama al servicio Predict con features y meta.dataId
 * Devuelve { predictionId, prediction, timestamp }
 */
async function fetchPredict(features, dataId) {
  const headers = {
    "Content-Type": "application/json"
  };

  const body = {
    features,
    meta: {
      featureCount: features.length,
      dataId,
      source: "orchestrator"
    }
  };

  const response = await fetch(PREDICT_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`PREDICT_BAD_STATUS:${response.status}`);
  }

  const json = await response.json();

  if (!json.predictionId || typeof json.prediction !== "number") {
    throw new Error("PREDICT_INVALID_RESULT");
  }

  return json; 
}

module.exports = fetchPredict;
