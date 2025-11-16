import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./App.css";

export default function App() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // CREATE SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      3000
    );
    camera.position.set(0, 2, 8);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#000000");
    mount.appendChild(renderer.domElement);

    // ⭐ REAL MILKY WAY BACKGROUND ⭐
    const loader = new THREE.TextureLoader();
    loader.load(
      "https://threejs.org/examples/textures/galaxy_starfield.png",
      (texture) => {
        const geometry = new THREE.SphereGeometry(1000, 64, 64);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.BackSide,
        });
        const stars = new THREE.Mesh(geometry, material);
        scene.add(stars);
      }
    );

    // ANIMATION LOOP
    const animate = () => {
      requestAnimationFrame(animate);
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="app-container">
      <div ref={mountRef} className="universe"></div>

      <div className="welcome-text">
        🚀 BossAIX | Real Cosmos Engine Online  
        <br />
        LIVE Universe Loading…
      </div>
    </div>
  );
}
