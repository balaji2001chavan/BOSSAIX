// -------------------------------------------------------
//  BOSS AIX – FULL WORKING UNIVERSE ENGINE (FINAL BUILD)
// -------------------------------------------------------

import * as THREE from "three";
import { createEarth } from "./EarthEngine";
import { createMoon } from "./MoonEngine";
import { createStarField } from "./StarFieldEngine";

export function initUniverse(mountRef) {

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
        75,
        mountRef.clientWidth / mountRef.clientHeight,
        0.1,
        2000
    );
    camera.position.set(0, 0, 200);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.clientWidth, mountRef.clientHeight);
    mountRef.appendChild(renderer.domElement);

    // LIGHT (SUN)
    const sunLight = new THREE.DirectionalLight(0xffffff, 2);
    sunLight.position.set(300, 200, 150);
    scene.add(sunLight);

    // BACKGROUND STARS
    createStarField(scene, THREE);

    // REAL EARTH
    const earthSystem = createEarth(scene, THREE);

    // REAL MOON
    const moon = createMoon(scene, THREE);

    // RENDER LOOP
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    // WINDOW RESIZE SUPPORT
    window.addEventListener("resize", () => {
        camera.aspect = mountRef.clientWidth / mountRef.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.clientWidth, mountRef.clientHeight);
    });
}
