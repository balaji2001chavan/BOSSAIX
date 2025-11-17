// ---------------------------------------------------------
//  BOSS AIX – REAL EARTH RENDER ENGINE (Ultra Clean)
// ---------------------------------------------------------

export function createEarth(scene, THREE) {

    // Textures
    const loader = new THREE.TextureLoader();

    const earthTexture = loader.load("https://raw.githubusercontent.com/balaji2001chavan/bossaix-assets/main/textures/earth.jpg");
    const cloudsTexture = loader.load("https://raw.githubusercontent.com/balaji2001chavan/bossaix-assets/main/textures/clouds.png");

    // EARTH SPHERE
    const earthGeo = new THREE.SphereGeometry(50, 64, 64);
    const earthMat = new THREE.MeshPhongMaterial({
        map: earthTexture,
    });

    const earth = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earth);

    // CLOUD LAYER
    const cloudGeo = new THREE.SphereGeometry(50.5, 64, 64);
    const cloudMat = new THREE.MeshPhongMaterial({
        map: cloudsTexture,
        transparent: true,
        opacity: 0.4,
    });

    const clouds = new THREE.Mesh(cloudGeo, cloudMat);
    scene.add(clouds);

    // ATMOSPHERE GLOW
    const glowGeo = new THREE.SphereGeometry(52, 64, 64);
    const glowMat = new THREE.MeshBasicMaterial({
        color: 0x4da6ff,
        transparent: true,
        opacity: 0.15
    });

    const atmosphere = new THREE.Mesh(glowGeo, glowMat);
    scene.add(atmosphere);

    // LIGHT (SUN)
    const sunlight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunlight.position.set(300, 200, 100);
    scene.add(sunlight);

    // ANIMATION
    function rotateEarth() {
        requestAnimationFrame(rotateEarth);

        earth.rotation.y += 0.0008;
        clouds.rotation.y += 0.001;
        atmosphere.rotation.y += 0.0006;

    }
    rotateEarth();

    return { earth, clouds, atmosphere };
}
