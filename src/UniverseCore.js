// ------------------------------------------------------
// BOSS AIX — UNIVERSE CORE DIAGNOSTIC MODE (Test Only)
// ------------------------------------------------------

export function createUniverseCore(THREE) {

    console.log("🔥 UniverseCore Diagnostic Mode ACTIVE");

    // 1) Renderer
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance"
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);

    // 2) Scene + Camera
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );

    camera.position.set(0, 0, 5);

    // 3) TEST OBJECT (White Cube)
    const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
    const cubeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const cube = new THREE.Mesh(cubeGeo, cubeMat);

    scene.add(cube);

    // 4) Animation loop
    function animate() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.02;

        renderer.render(scene, camera);
    }

    animate();

    console.log("🟢 Diagnostic Engine RUNNING – You should see WHITE ROTATING CUBE");

    return { renderer, scene, camera };
}
