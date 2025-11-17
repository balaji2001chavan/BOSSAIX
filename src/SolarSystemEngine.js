// ---------------------------------------------------------
// BOSS AIX – FULL SOLAR SYSTEM ENGINE (HD Sun + Planets)
// Scientific Sun-Center Orbit Model
// ---------------------------------------------------------

export function createSolarSystem(scene, THREE) {

    const loader = new THREE.TextureLoader();

    // ----------------------------
    // 1) SUN (Center Star)
    // ----------------------------
    const sunTexture = loader.load("https://threejs.org/examples/textures/planets/sun.jpg");

    const sunGeo = new THREE.SphereGeometry(30, 64, 64);
    const sunMat = new THREE.MeshBasicMaterial({
        map: sunTexture
    });

    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    // SUN GLOW
    const sunGlowGeo = new THREE.SphereGeometry(45, 64, 64);
    const sunGlowMat = new THREE.MeshBasicMaterial({
        color: 0xffa500,
        transparent: true,
        opacity: 0.3
    });

    const sunGlow = new THREE.Mesh(sunGlowGeo, sunGlowMat);
    scene.add(sunGlow);

    // PLANET DATA
    const planetsData = [
        {
            name: "Mercury",
            size: 4,
            distance: 50,
            speed: 0.02,
            texture: "https://threejs.org/examples/textures/planets/mercury.jpg"
        },
        {
            name: "Venus",
            size: 7,
            distance: 70,
            speed: 0.015,
            texture: "https://threejs.org/examples/textures/planets/venus.jpg"
        },
        {
            name: "Earth",
            size: 8,
            distance: 95,
            speed: 0.012,
            texture: "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
        },
        {
            name: "Mars",
            size: 6,
            distance: 120,
            speed: 0.01,
            texture: "https://threejs.org/examples/textures/planets/mars_1024.jpg"
        },
        {
            name: "Jupiter",
            size: 16,
            distance: 160,
            speed: 0.008,
            texture: "https://threejs.org/examples/textures/planets/jupiter.jpg"
        },
        {
            name: "Saturn",
            size: 14,
            distance: 210,
            speed: 0.006,
            texture: "https://threejs.org/examples/textures/planets/saturn.jpg"
        },
        {
            name: "Uranus",
            size: 12,
            distance: 260,
            speed: 0.004,
            texture: "https://threejs.org/examples/textures/planets/uranus.jpg"
        },
        {
            name: "Neptune",
            size: 12,
            distance: 310,
            speed: 0.003,
            texture: "https://threejs.org/examples/textures/planets/neptune.jpg"
        }
    ];

    const planets = [];

    planetsData.forEach(data => {
        const tex = loader.load(data.texture);
        const geo = new THREE.SphereGeometry(data.size, 32, 32);
        const mat = new THREE.MeshPhongMaterial({ map: tex });

        const planet = new THREE.Mesh(geo, mat);
        scene.add(planet);

        planets.push({
            mesh: planet,
            distance: data.distance,
            angle: Math.random() * Math.PI * 2,
            speed: data.speed
        });
    });

    // ANIMATION
    function animatePlanets() {
        requestAnimationFrame(animatePlanets);

        planets.forEach(p => {
            p.angle += p.speed;
            p.mesh.position.x = p.distance * Math.cos(p.angle);
            p.mesh.position.z = p.distance * Math.sin(p.angle);
            p.mesh.rotation.y += 0.002;
        });
    }

    animatePlanets();

    return { sun, planets };
}
