// ========================================================
// ⭐ BOSS AIX — SMART EARTH AUTO-CONNECT ENGINE (1 FILE)
// ========================================================

(function setupEarthLayer() {

    // Import Earth Engine
    import("./EarthLevel").then(module => {

        const createEarthLevel = module.createEarthLevel;

        // Wait until UniverseCore is fully loaded
        const checkInterval = setInterval(() => {

            if (window.BOSS_UNIVERSE_CORE_READY) {

                clearInterval(checkInterval);

                // Access THREE + Layers from UniverseCore
                const { THREE, layers, registerAnimation } = window.BOSS_CORE_API;

                // Create Earth inside the correct layer
                const earth = createEarthLevel(THREE, layers.earthLayer);

                // Register Earth animation automatically
                registerAnimation(() => {
                    if (earth && earth.tick) earth.tick();
                });

                console.log("🌍 Earth Level Loaded Successfully");

            }

        }, 50);

    });

})();
