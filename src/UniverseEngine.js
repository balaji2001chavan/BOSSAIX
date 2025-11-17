// ----------------------------------------------
// EARTH ENGINE INTEGRATION (SMART FINAL CODE)
// ----------------------------------------------

import { createEarth } from "./EarthEngine";   // <-- DIRECT IMPORT

export function initUniverse(scene, camera, renderer, THREE) {

    // ★ Create Real Earth (HD Texture + Clouds + Glow)
    const earthSystem = createEarth(scene, THREE);

    // ★ Camera position (adjust for better Earth view)
    camera.position.set(0, 0, 200);

    // ★ Start Render Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    }

    animate();
}
