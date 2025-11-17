// -------------------------------------------------------
//   BOSS AIX – FULL WORKING UNIVERSE ENGINE (FINAL)
//   Earth + Starfield visible LIVE on first load
// -------------------------------------------------------

import * as THREE from "three";
import { createEarth } from "./EarthEngine";
import { createStarField } from "./StarFieldEngine";

export function initUniverse(mountRef) {

    // -----------------------------
    // SCENE
    // -----------------------------
    const scene = new THREE.Scene();

    // -----------------------------
    // CAMERA
    // -----------------------------
    const camera = new THREE.PerspectiveCamera(
        75,
        mountRef.clientWidth / mountRef.clientHeight,
        0.1,
        1000
    );

    camera.position.set(0, 0, 200);

    // -----------------------------
    // RENDERER
    // -----------------------------
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.clientWidth, mountRef.clientHeight);
    mountRef.appendChild(renderer.domElement);

    // -----------------------------
    // LIGHT (SUNLIGHT)
    // -----------------------------
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(300, 200, 100);
    scene.add(sunLight);

    // -----------------------------
    // ★ Add REAL STARFIELD
    // -----------------------------
    createStarField(scene);

    // -----------------------------
    // ★ Add REAL EARTH (HD + Clouds + Glow)
    // -----------------------------
    createEarth(scene, THREE);

    // -----------------------------
    // RENDER LOOP
    // -----------------------------
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();

    // Resize handling
    window.addEventListener("resize", () => {
        camera.aspect = mountRef.clientWidth / mountRef.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.clientWidth, mountRef.clientHeight);
    });
}
