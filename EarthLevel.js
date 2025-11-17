// -----------------------------------------
// BOSS AIX — EARTH LEVEL ENGINE v1.0
// Ultra HD Earth • Clouds • Atmosphere Glow
// -----------------------------------------

export function createEarthLevel(THREE, parentLayer) {

    const earthGroup = new THREE.Group();
    parentLayer.add(earthGroup);

    // ---------------------------
    // 1) HIGH RES TEXTURES (8K)
    // ---------------------------
    const loader = new THREE.TextureLoader();

    const earthTexture = loader.load(
        "https://raw.githubusercontent.com/balaji2001chavan/bossaix-assets/main/textures/earth_day_8k.jpg"
    );

    const earthNormal = loader.load(
        "https://raw.githubusercontent.com/balaji2001chavan/bossaix-assets/main/textures/earth_normal.jpg"
    );

    const earthSpecular = loader.load(
        "https://raw.githubusercontent.com/balaji2001chavan/bossaix-assets/main/textures/earth_spec.jpg"
    );

    const earthMaterial = new THREE.MeshPhongMaterial({
        map: earthTexture,
        normalMap: earthNormal,
        specularMap: earthSpecular,
        shininess: 10
    });

    const earth = new THREE.Mesh(
        new THREE.SphereGeometry(1, 64, 64),
        earthMaterial
    );

    earthGroup.add(earth);

    // ---------------------------
    // 2) CLOUD LAYER (REALISTIC)
    // ---------------------------
    const cloudTexture = loader.load(
        "https://raw.githubusercontent.com/balaji2001chavan/bossaix-assets/main/textures/clouds.png"
    );

    const cloudMaterial = new THREE.MeshLambertMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.4
    });

    const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(1.01, 64, 64),
        cloudMaterial
    );

    earthGroup.add(clouds);

    // ---------------------------
    // 3) ATMOSPHERE GLOW
    // ---------------------------
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x4ca5ff,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    });

    const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.07, 64, 64),
        glowMaterial
    );

    earthGroup.add(atmosphere);

    // ---------------------------
    // 4) ANIMATION LOOP
    // ---------------------------
    earthGroup.tick = () => {
        earth.rotation.y += 0.0005;
        clouds.rotation.y += 0.0007;
    };

    return earthGroup;
}
