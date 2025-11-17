// ----------------------------------------------
//  BOSS AIX – REAL LIVE EPHEMERIS ENGINE (v1)
//  WITH SUN + MOON REAL-TIME MODULES CONNECTED
// ----------------------------------------------

import { getSunLive } from "./SunLiveData";
import { getMoonLive } from "./MoonLiveData";

export class BossAIX_Engine {

    constructor(updateInterval = 2000) {
        this.updateInterval = updateInterval;   // 2 seconds
        this.mode = "AUTO";                     // Auto Switch Mode (DAY/NIGHT)
        this.data = {};                         // All celestial data stored here
        this.subscribers = [];                  // 3D render subscribers
    }

    // -------------------------------
    // LIVE LOADERS (SUN + MOON ACTIVE)
    // -------------------------------

    async loadSunLive() {
        const sun = await getSunLive();
        this.data.sun = sun;
    }

    async loadMoonLive() {
        const moon = await getMoonLive();
        this.data.moon = moon;
    }

    // बाकी modules नंतर add करू
    async loadEarthLive() {}
    async loadPlanetsLive() {}
    async loadISS() {}
    async loadSatellitesLive() {}
    async loadAurora() {}
    async loadStars() {}

    // --------------------------------
    // AUTO-MODE DECISION
    // --------------------------------
    decideModeByTime() {
        const hour = new Date().getHours();

        if (hour >= 6 && hour < 17) this.mode = "SUN";     // Morning → Sun Mode
        else if (hour >= 17 && hour < 19) this.mode = "EARTH"; // Evening → Solar System Mode
        else this.mode = "SKY";                            // Night → Live Sky Mode
    }

    // --------------------------------
    // MASTER UPDATE LOOP (Every 2 sec)
    // --------------------------------
    async update() {
        this.dec
