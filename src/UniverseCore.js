// -----------------------------------------------
// BOSS AIX — UNIVERSE CORE ENGINE v1.0
// (FAST • SMART • REAL • ZERO LAG)
// -----------------------------------------------

export function createUniverseCore(THREE) {
    
    // -------------------------------------------
    // 1) RENDERER — GPU POWER
    // -------------------------------------------
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance"
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // -------------------------------------------
    // 2) SCENE — Universe Root Layer
    // -------------------------------------------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // -------------------------------------------
    // 3) CAMERA — Cinematic + Interactive Hybrid
    // -------------------------------------------
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.01,
        9999999999
    );

    camera.position.set(0, 0, 4); // Earth-level starting distance

    // Smooth camera controller
    const cameraTarget = new THREE.Vector3(0, 0, 0);
    const cameraVelocity = new THREE.Vector3(0, 0, 0);

    function updateCamera() {
        camera.position.add(cameraVelocity.multiplyScalar(0.08));
        camera.lookAt(cameraTarget);
    }

    // -------------------------------------------
    // 4) LAYERS — (Earth → Solar → Galaxy → Universe)
    // -------------------------------------------
    const layers = {
        earthLayer: new THREE.Group(),
        moonLayer: new THREE.Group(),
        solarLayer: new THREE.Group(),
        galaxyLayer: new THREE.Group(),
        universeLayer: new THREE.Group()
    };

    // Add layers to scene
    scene.add(
        layers.earthLayer,
        layers.moonLayer,
        layers.solarLayer,
        layers.galaxyLayer,
        layers.universeLayer
    );

    // -------------------------------------------
    // 5) SMOOTH ZOOM ENGINE
    // -------------------------------------------
    let zoomSpeed = 0;

    function smoothZoom() {
        camera.position.z += zoomSpeed;
        zoomSpeed *= 0.95; // natural damping
    }

    // -------------------------------------------
    // 6) TOUCH CONTROLS — INTERACTIVE MODE
    // -------------------------------------------
    let isUserInteracting = false;
    let lastTouchY = 0;

    window.addEventListener("touchstart", (e) => {
        isUserInteracting = true;
        lastTouchY = e.touches[0].clientY;
        zoomSpeed = 0;
    });

    window.addEventListener("touchmove", (e) => {
        const currentY = e.touches[0].clientY;
        zoomSpeed = (lastTouchY - currentY) * 0.01;
        lastTouchY = currentY;
    });

    window.addEventListener("touchend", () => {
        isUserInteracting = false;
    });

    // -------------------------------------------
    // 7) AUTO-CINEMATIC MODE (IF IDLE)
    // -------------------------------------------
    let idleTimer = 0;

    function autoCinematic() {
        if (!isUserInteracting) {
            idleTimer++;
            if (idleTimer > 100) {
                zoomSpeed = -0.02; // slow deep zoom-out
            }
        } else {
            idleTimer = 0;
        }
    }

    // -------------------------------------------
    // 8) RESIZE HANDLER
    // -------------------------------------------
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    // -------------------------------------------
    // 9) MAIN ANIMATION LOOP (120 FPS)
    // -------------------------------------------
    function animate() {
        requestAnimationFrame(animate);

        updateCamera();
        smoothZoom();
        autoCinematic();

        renderer.render(scene, camera);
    }

    animate();

    // -------------------------------------------
    // 10) RETURN OBJECTS TO ENGINE
    // -------------------------------------------
    return { renderer, scene, camera, layers };
}
