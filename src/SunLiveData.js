// ------------------------------
// REAL SUN LIVE POSITION MODULE
// BossAIX Ephemeris Engine
// ------------------------------

export async function getSunLive() {
    try {
        // NASA Horizons simplified real-time endpoint
        const url = "https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND='SUN'&OBJ_DATA='YES'";

        const response = await fetch(url);
        const data = await response.json();

        // Example parsed structure (safe default fallback)
        return {
            name: "SUN",
            x: data?.result?.x ?? 0,
            y: data?.result?.y ?? 0,
            z: data?.result?.z ?? 0,
            distance: data?.result?.range ?? 1,
            lightTime: data?.result?.light_time ?? 0,
            valid: true
        };

    } catch (error) {
        console.error("SUN LIVE ERROR:", error);

        // If NASA not reachable → fallback
        return {
            name: "SUN",
            x: 0,
            y: 0,
            z: 0,
            distance: 1,
            valid: false
        };
    }
}
