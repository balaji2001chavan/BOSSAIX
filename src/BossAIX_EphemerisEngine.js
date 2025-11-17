// -------------------------------------------------------
//   BOSS AIX – SMART REAL LIVE UNIVERSE ENGINE (v2)
//   ONE FILE → FULL COSMOS LIVE (Sun + Moon + Planets + ISS + Satellites)
// -------------------------------------------------------

import { getSunLive } from "./SunLiveData";
import { getMoonLive } from "./MoonLiveData";
import { getPlanetsLive } from "./PlanetLiveData";
import { getISSLive } from "./ISSLiveData";
import { getSatellitesLive } from "./SatellitesLiveData";

export class BossAIX_Engine {

    constructor(updateInterval = 2000) {
        this.updateInterval = updateInterval; 
        this.mode = "AUTO";
        this.data = {};
        this.subscribers = [];
    }

    // -------------------------
    // LIVE DATA LOADING
    // -------------------------

    async loadSunLive() {
        this.data.sun = await getSunLive();
    }

    async loadMoonLive() {
        this.data.moon = await getMoonLive();
    }

    async loadPlanetsLive() {
        this.data.planets = await getPlanetsLive();
    }

    async loadISS() {
        this.data.iss = await getISSLive();
    }

    async loadSatellitesLive() {
        this.data.satellites = await getSatellitesLive();
    }

    // -------------------------
    // AUTO MODE (DAY/NIGHT)
    // -------------------------
    decideModeByTime() {
        const hour = new Date().getHours();

        if (hour >= 6 && hour < 17) this.mode = "SUN";      // Day view
        else if (hour >= 17 && hour < 19) this.mode = "EARTH"; // Evening solar system
        else this.mode = "SKY";                             // Night sky mode
    }

    // -------------------------
    // UNIVERSE UPDATE LOOP
    // -------------------------
    async update() {
        this.decideModeByTime();

        await this.loadSunLive();
        await this.loadMoonLive();
        await this.loadPlanetsLive();
        await this.loadISS();
        await this.loadSatellitesLive();

        this.broadcast();
    }

    // -------------------------
    // SEND DATA TO 3D RENDER
    // -------------------------
    broadcast() {
        for (let fn of this.subscribers) {
            fn(this.data);
        }
    }

    // -------------------------
    // SUBSCRIBE FROM FRONTEND
    // -------------------------
    onUpdate(callback) {
        this.subscribers.push(callback);
    }
}
