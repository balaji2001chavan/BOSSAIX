export class BossAIX_Engine {

    constructor(updateInterval = 2000) {
        this.updateInterval = updateInterval;
        this.mode = "AUTO";
        this.data = {};
        this.subscribers = [];
    }

    async loadSunLive() {}
    async loadEarthLive() {}
    async loadMoonLive() {}
    async loadPlanetsLive() {}
    async loadISS() {}
    async loadSatellitesLive() {}
    async loadAurora() {}
    async loadStars() {}

    decideModeByTime() {}

    convertToHeliocentric() {}
    convertToGeocentric() {}
    convertToTopocentric() {}

    async update() {
        this.decideModeByTime();
        await this.loadSunLive();
        await this.loadEarthLive();
        await this.loadMoonLive();
        await this.loadPlanetsLive();
        await this.loadISS();
        await this.loadSatellitesLive();
        await this.loadAurora();
        this.broadcast();
    }

    broadcast() {
        for (let fn of this.subscribers) {
            fn(this.data);
        }
    }

    onUpdate(callback) {
        this.subscribers.push(callback);
    }
}
