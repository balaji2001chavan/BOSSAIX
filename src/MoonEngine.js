// ------------------------------------------------------
//  BOSS AIX – REAL MOON ENGINE (HD Moon + Orbit + Light)
// ------------------------------------------------------

export function createMoon(scene, THREE) {

    const loader = new THREE.TextureLoader();

    // Moon texture (HD)
    const moonTexture = loader.load(
        "https://raw.githubusercontent.com/balaji2001chavan/bossaix-assets/main/textures/moon.jpg"
    );

    // Moon sphere
    const moonGeo = new THREE.SphereGeometry(15, 64, 64);
    const moonMat = new THREE.MeshPhongMaterial({
        map: moonTexture
    });

    const moon = new THREE.Mesh(moonGeo, moonMat);

    // Position Moon near Earth initially
    moon.position.set(120, 0, 0);
    scene.add(moon);

    // Orbit angle
    let angle = 0;

    // Orbit & rotation animation
    function animateMoon() {
        requestAnimationFrame(animateMoon);

        angle += 0.002; // speed of orbit
        moon.position.x = 120 * Math.cos(angle);
        moon.position.z = 120 * Math.sin(angle);

        moon.rotation.y += 0.001; // slow rotation
    }

    animateMoon();

    return moon;
}
