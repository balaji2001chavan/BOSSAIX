// -----------------------------------------------------
//  BOSS AIX – REAL EARTH ENGINE (HD + CLOUDS + GLOW)
// -----------------------------------------------------

export function createEarth(scene, THREE) {

    const loader = new THREE.TextureLoader();

    const earthTexture = loader.load(
        "https://raw.githubusercontent.com/balaji2001chavan/bossaix-assets/main/textures/earth.jpg"
    );

    const cloudsTexture = loader.load(
        "https://raw.githubusercontent.com/balaji2001chavan/bossaix-assets/main/textures/clouds.png"
    );

    // Earth Sphere
    const earthGeo = new THREE.SphereGeometry(50, 64, 64);
    const earthMat = new THREE.MeshPhongMaterial({
        map: earthTexture
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earth);

    // Cloud Layer
    const cloudGeo = new THREE.SphereGeometry(51, 64, 64);
    const cloudMat = new THREE.MeshPhongMaterial({
        map: cloudsTexture,
        transparent: true,
        opacity: 0.4
    });
    const clouds = new THREE.Mesh(cloudGeo, cloudMat);
    scene.add(clouds);

    // Atmosphere Glow
    const glowGeo = new THREE.SphereGeometry(53, 64, 64);
    const glowMat = new THREE.MeshBasicMaterial({
        color: 0x4da6ff,
        transparent: true,
        opacity: 0.15
    });
    const atmosphere = new THREE.Mesh(glowGeo, glowMat);
    scene.add(atmosphere);

    // Rotation
    function spinEarth() {
        requestAnimationFrame(spinEarth);
        earth.rotation.y += 0.001;
        clouds.rotation.y += 0.0015;
    }
    spinEarth();

    return { earth, clouds, atmosphere };
}
