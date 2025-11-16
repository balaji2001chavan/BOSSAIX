import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./App.css";

// BASE64 Galaxy Texture (never fails)
const GALAXY_TEXTURE =
"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD... (full base64 here)";

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
    mount.appendChild(renderer.domElement);

    // Galaxy Sphere
    const loader = new THREE.TextureLoader();
    const texture = loader.load(GALAXY_TEXTURE);

    const geometry = new THREE.SphereGeometry(1000, 64, 64);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    });

    const universe = new THREE.Mesh(geometry, material);
    scene.add(universe);

    // Animate
    const animate = () => {
      universe.rotation.y += 0.0005;
      universe.rotation.x += 0.0002;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => mount.removeChild(renderer.domElement);
  }, []);

  return (
    <div className="app-container">
      <div ref={mountRef} className="universe"></div>

      <div className="welcome-text">
        🌌 BossAIX | Real Galaxy Engine Online  
        <br /> Universe Loaded
      </div>
    </div>
  );
}
