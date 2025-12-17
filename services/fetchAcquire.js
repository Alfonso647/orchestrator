// services/fetchAcquire.js
const ACQUIRE_URL = "http://localhost:3001/data"; // URL del servicio Acquire

/**
 * Llama al servicio Acquire para obtener datos nuevos
 * Devuelve { dataId, features, featureCount, scalerVersion, createdAt }
 */
async function fetchAcquire() {
  const headers = {
    "Content-Type": "application/json"
  };

  // El contrato de Acquire no requiere body, podemos enviar un objeto vacío
  const response = await fetch(ACQUIRE_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({})
  });

  if (!response.ok) {
    throw new Error(`ACQUIRE_BAD_STATUS:${response.status}`);
  }

  const json = await response.json();

  // Validamos que el response tenga dataId y features
  if (!json.dataId || !Array.isArray(json.features)) {
    throw new Error("ACQUIRE_INVALID_RESULT");
  }

  return json; // { dataId, features, featureCount, scalerVersion, createdAt }
}

module.exports = fetchAcquire;
