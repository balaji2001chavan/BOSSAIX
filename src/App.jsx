import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./App.css";

export default function App() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#000000");
    mount.appendChild(renderer.domElement);

    // ⭐ WORKING GALAXY TEXTURE ⭐
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "";

    loader.load(
      "https://raw.githubusercontent.com/balaji2001chavan/assets/main/stars_milkyway.jpg",
      (texture) => {
        const geometry = new THREE.SphereGeometry(1000, 64, 64);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.BackSide,
        });
        const universe = new THREE.Mesh(geometry, material);
        scene.add(universe);

        // Rotation
        const animate = () => {
          universe.rotation.y += 0.0005;
          universe.rotation.x += 0.0002;

          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        };
        animate();
      }
    );

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="app-container">
      <div ref={mountRef} className="universe"></div>

      <div className="welcome-text">
        🌌 BossAIX | Live Galaxy Engine  
        <br /> Real Universe Loading…
      </div>
    </div>
  );
}
