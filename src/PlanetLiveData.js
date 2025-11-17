// ----------------------------------------------------
// REAL PLANETS LIVE MODULE (Mercury → Neptune)
// BossAIX Ephemeris Engine
// ----------------------------------------------------

const PLANETS = [
  { name: "MERCURY", id: "199" },
  { name: "VENUS", id: "299" },
  { name: "MARS", id: "499" },
  { name: "JUPITER", id: "599" },
  { name: "SATURN", id: "699" },
  { name: "URANUS", id: "799" },
  { name: "NEPTUNE", id: "899" }
];

export async function getPlanetsLive() {
    const results = [];

    for (let p of PLANETS) {
        try {
            const url =
              `https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND='${p.id}'&OBJ_DATA='YES'`;

            const res = await fetch(url);
            const data = await res.json();

            results.push({
                name: p.name,
                x: data?.result?.x ?? 0,
                y: data?.result?.y ?? 0,
                z: data?.result?.z ?? 0,
                distance: data?.result?.range ?? 1,
                valid: true
            });

        } catch (err) {
            console.error("PLANET ERROR", p.name, err);
            results.push({
                name: p.name,
                x: 0, y: 0, z: 0,
                valid: false
            });
        }
    }

    return results;
}
