export function createEarth(scene, THREE) {

    const loader = new THREE.TextureLoader();

    const earthTexture = loader.load(
        "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
    );

    const cloudsTexture = loader.load(
        "https://threejs.org/examples/textures/planets/earth_clouds_1024.png"
    );

    const earthGeo = new THREE.SphereGeometry(50, 64, 64);
    const earthMat = new THREE.MeshPhongMaterial({
        map: earthTexture
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earth);

    const cloudGeo = new THREE.SphereGeometry(51, 64, 64);
    const cloudMat = new THREE.MeshPhongMaterial({
        map: cloudsTexture,
        transparent: true,
        opacity: 0.4
    });
    const clouds = new THREE.Mesh(cloudGeo, cloudMat);
    scene.add(clouds);

    const glowGeo = new THREE.SphereGeometry(53, 64, 64);
    const glowMat = new THREE.MeshBasicMaterial({
        color: 0x4da6ff,
        transparent: true,
        opacity: 0.15
    });
    const atmosphere = new THREE.Mesh(glowGeo, glowMat);
    scene.add(atmosphere);

    function spinEarth() {
        requestAnimationFrame(spinEarth);
        earth.rotation.y += 0.001;
        clouds.rotation.y += 0.0014;
    }
    spinEarth();
}
