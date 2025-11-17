// ---------------------------------------------------------
//  BOSS AIX – FULL UNIVERSE ENGINE (FINAL SUN-CENTER MODEL)
//  Stars + Sun + Planets + Earth + Moon (All in One)
// ---------------------------------------------------------

import * as THREE from "three";
import { createEarth } from "./EarthEngine";
import { createMoon } from "./MoonEngine";
import { createStarField } from "./StarFieldEngine";
import { createSolarSystem } from "./SolarSystemEngine";

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
        4000
    );
    camera.position.set(0, 200, 500);

    // -----------------------------
    // RENDERER
    // -----------------------------
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.clientWidth, mountRef.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.innerHTML = ""; 
    mountRef.appendChild(renderer.domElement);

    // -----------------------------
    // LIGHT (SUNLIGHT)
    // -----------------------------
    const sunlight = new THREE.PointLight(0xffffff, 2, 0);
    sunlight.position.set(0, 0, 0);
    scene.add(sunlight);

    // -----------------------------
    // 🌌 1) BACKGROUND STARS
    // -----------------------------
    createStarField(scene, THREE);

    // -----------------------------
    // ☀️ 2) COMPLETE SOLAR SYSTEM
    // -----------------------------
    createSolarSystem(scene, THREE);

    // -----------------------------
    // 🌍 3) EARTH (HD)
    // -----------------------------
    createEarth(scene, THREE);

    // -----------------------------
    // 🌕 4) MOON ORBIT
    // -----------------------------
    createMoon(scene, THREE);

    // -----------------------------
    // RENDER LOOP
    // -----------------------------
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    // -----------------------------
    // RESPONSIVE RESIZE
    // -----------------------------
    window.addEventListener("resize", () => {
        camera.aspect = mountRef.clientWidth / mountRef.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.clientWidth, mountRef.clientHeight);
    });
}
