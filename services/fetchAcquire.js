// services/fetchAcquire.js
const ACQUIRE_URL = "http://localhost:3001/data"; 

/**
 * Llama al servicio Acquire para obtener datos nuevos
 * Devuelve { dataId, features, featureCount, scalerVersion, createdAt }
 */
async function fetchAcquire() {
  const headers = {
    "Content-Type": "application/json"
  };

  const response = await fetch(ACQUIRE_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({})
  });

  if (!response.ok) {
    throw new Error(`ACQUIRE_BAD_STATUS:${response.status}`);
  }

  const json = await response.json();

  if (!json.dataId || !Array.isArray(json.features)) {
    throw new Error("ACQUIRE_INVALID_RESULT");
  }

  return json; 
}

module.exports = fetchAcquire;
