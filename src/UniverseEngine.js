// -------------------------------
// STARFIELD INTEGRATION (NEW)
// -------------------------------

import { createStarField } from "./StarFieldEngine";

// THREE.js scene + camera + renderer तयार झाल्यानंतर:
export function initUniverse(scene, camera, renderer) {

    // ★ Create Real Starfield (50,000 stars)
    const stars = createStarField(scene);

    // ★ Adjust camera if needed
    camera.position.set(0, 0, 500);

    // ★ Start Rendering Loop
    function animate() {
        requestAnimationFrame(animate);

        // rotate starfield slowly (sky motion feel)
        stars.rotation.y += 0.0003;

        renderer.render(scene, camera);
    }

    animate();
}
