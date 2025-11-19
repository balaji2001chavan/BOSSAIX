export function createMoon(scene, THREE) {

    const loader = new THREE.TextureLoader();

    const moonTexture = loader.load(
        "https://threejs.org/examples/textures/planets/moon_1024.jpg"
    );

    const moonGeo = new THREE.SphereGeometry(15, 64, 64);
    const moonMat = new THREE.MeshPhongMaterial({
        map: moonTexture
    });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    scene.add(moon);

    let angle = 0;

    function orbitMoon() {
        requestAnimationFrame(orbitMoon);

        angle += 0.002;
        moon.position.x = 120 * Math.cos(angle);
        moon.position.z = 120 * Math.sin(angle);

        moon.rotation.y += 0.001;
    }

    orbitMoon();
}
