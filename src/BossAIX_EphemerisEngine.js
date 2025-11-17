// -----------------------------------------------------
//  BOSS AIX – REAL LIVE EPHEMERIS ENGINE (v1)
//  Sun + Moon + Planets + ISS (Real-Time Live Data)
// -----------------------------------------------------

import { getSunLive } from "./SunLiveData";
import { getMoonLive } from "./MoonLiveData";
import { getPlanetsLive } from "./PlanetLiveData";
import { getISSLive } from "./ISSLiveData";

export class BossAIX_Engine {

    constructor(updateInterval = 2000) {
        this.updateInterval = updateInterval;   // 2 seconds
        this.mode = "AUTO";                     // Sun/Earth/Sky Auto Mode
        this.data = {};                         // All live data
        this.subscribers = [];                  // Render engine connections
    }

    // ------------------------------
    // LIVE DATA LOADERS
    // ------------------------------

    async loadSunLive() {
        const sun = await getSunLive();
        this.data.sun = sun;
    }

    async loadMoonLive() {
        const moon = await getMoonLive();
        this.data.moon = moon;
    }

    async loadPlanetsLive() {
        const planets = await getPlanetsLive();
        this.data.planets = planets;
    }

    async loadISS() {
        const iss = await getISSLive();
        this.data.iss = iss;
    }

    // बाकिचे modules नंतर जोडू
    async loadStars() {}
    async loadAurora() {}
    async loadSatellitesLive() {}

    // ------------------------------
    // AUTO MODE DECISION SYSTEM
    // ------------------------------
    decideModeByTime() {
        const hour = new Date().getHours();

        if (hour >= 6 && hour < 17) {
            this.mode = "SUN";       // Morning
        }
        else if (hour >= 17 && hour < 19) {
            this.mode = "EARTH";     // Sunset
        }
        else {
            this.mode = "SKY";       // Night Sky
        }
    }

    // ------------------------------
    // MASTER UPDATE LOOP (EVERY 2 SEC)
    // ------------------------------
    async update() {
        this.decideModeByTime();

        await this.loadSunLive();
        await this.loadMoonLive();
        await this.loadPlanetsLive();
        await this.loadISS();

        this.broadcast();
    }

    // ------------------------------
    // SEND LIVE DATA TO 3D ENGINE
    // ------------------------------
    broadcast() {
        for (let fn of this.subscribers) {
            fn(this.data);
        }
    }

    // ------------------------------
    // SUBSCRIBE RENDER MODULE
    // ------------------------------
    onUpdate(callback) {
        this.subscribers.push(callback);
    }
}
