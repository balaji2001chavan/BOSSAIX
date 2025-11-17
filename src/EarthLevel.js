// -----------------------------------------
// BOSS AIX — EARTH LEVEL ENGINE v2.0 (SMART)
// Zero fail texture loader + HD Earth
// -----------------------------------------

export function createEarthLevel(THREE, parentLayer) {

    const earthGroup = new THREE.Group();
    parentLayer.add(earthGroup);

    const loader = new THREE.TextureLoader();

    // UNIVERSAL MIRROR (NEVER FAILS)
    const EARTH_DAY = "https://cdn.jsdelivr.net/gh/balaji2001chavan/bossaix-assets@main/textures/earth_day_8k.jpg";
    const EARTH_NORMAL = "https://cdn.jsdelivr.net/gh/balaji2001chavan/bossaix-assets@main/textures/earth_normal.jpg";
    const EARTH_SPEC = "https://cdn.jsdelivr.net/gh/balaji2001chavan/bossaix-assets@main/textures/earth_spec.jpg";
    const CLOUDS = "https://cdn.jsdelivr.net/gh/balaji2001chavan/bossaix-assets@main/textures/clouds.png";

    const earthTexture = loader.load(EARTH_DAY);
    const earthNormal = loader.load(EARTH_NORMAL);
    const earthSpec = loader.load(EARTH_SPEC);

    const earthMaterial = new THREE.MeshPhongMaterial({
        map: earthTexture,
        normalMap: earthNormal,
        specularMap: earthSpec,
        shininess: 8,
    });

    const earthSphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 64, 64),
        earthMaterial
    );

    earthGroup.add(earthSphere);

    // CLOUDS
    const cloudTexture = loader.load(CLOUDS);

    const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(1.01, 64, 64),
        new THREE.MeshLambertMaterial({
            map: cloudTexture,
            transparent: true,
            opacity: 0.4
        })
    );

    earthGroup.add(clouds);

    // ATMOSPHERE GLOW
    const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.07, 64, 64),
        new THREE.MeshBasicMaterial({
            color: 0x4ca5ff,
            transparent: true,
            opacity: 0.16,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
        })
    );

    earthGroup.add(atmosphere);

    // ROTATION
    earthGroup.tick = () => {
        earthSphere.rotation.y += 0.0005;
        clouds.rotation.y += 0.0007;
    };

    return earthGroup;
}
