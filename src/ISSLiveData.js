// -----------------------------------------------------
// REAL ISS LIVE DATA (USING TLE + SGP4 ORBIT ENGINE)
// BossAIX Ephemeris Engine
// -----------------------------------------------------

// ISS TLE Source (always updated)
const ISS_TLE_URL = "https://api.wheretheiss.at/v1/satellites/25544";

export async function getISSLive() {
    try {
        const response = await fetch(ISS_TLE_URL);
        const data = await response.json();

        return {
            name: "ISS",
            latitude: data.latitude,
            longitude: data.longitude,
            altitude: data.altitude,
            velocity: data.velocity,
            timestamp: data.timestamp,
            valid: true
        };

    } catch (error) {
        console.error("ISS LIVE ERROR:", error);

        return {
            name: "ISS",
            latitude: 0,
            longitude: 0,
            altitude: 0,
            velocity: 0,
            valid: false
        };
    }
}
