// -----------------------------------------
// REAL MOON LIVE POSITION MODULE
// BossAIX Ephemeris Engine
// -----------------------------------------

export async function getMoonLive() {
    try {
        // NASA Horizons API for Moon (ID = 301)
        const url =
          "https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND='301'&OBJ_DATA='YES'";

        const response = await fetch(url);
        const data = await response.json();

        return {
            name: "MOON",
            x: data?.result?.x ?? 0,
            y: data?.result?.y ?? 0,
            z: data?.result?.z ?? 0,
            distance: data?.result?.range ?? 1,
            lightTime: data?.result?.light_time ?? 0,
            valid: true
        };

    } catch (error) {
        console.error("MOON LIVE ERROR:", error);

        // fallback if NASA unreachable
        return {
            name: "MOON",
            x: 1,
            y: 0,
            z: 0,
            distance: 1,
            valid: false
        };
    }
}
