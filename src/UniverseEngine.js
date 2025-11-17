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

    mountRef.innerHTML = ""; // clear old canvas
    mountRef.appendChild(renderer.domElement);

    // SUN LIGHT
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(200, 150, 100);
    scene.add(sunLight);

    // STARS
    createStarField(scene, THREE);

    // EARTH
    createEarth(scene, THREE);

    // MOON
    createMoon(scene, THREE);

    // RENDER LOOP
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();

    // RESIZE SUPPORT
    window.addEventListener("resize", () => {
        camera.aspect = mountRef.clientWidth / mountRef.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.clientWidth, mountRef.clientHeight);
    });
}
