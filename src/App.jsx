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
      1000
    );
    camera.position.z = 2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // Galaxy Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 3000;

    const starArray = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starArray[i] = (Math.random() - 0.5) * 5;
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starArray, 3)
    );

    const starsMaterial = new THREE.PointsMaterial({
      color: 0x88ccff,
      size: 0.005,
    });

    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);

    // Animate
    const animate = () => {
      starsMesh.rotation.y += 0.0007;
      starsMesh.rotation.x += 0.0003;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => mount.removeChild(renderer.domElement);
  }, []);

  return (
    <div className="app-container">
      <div ref={mountRef} className="galaxy"></div>

      <div className="welcome-text">
        Welcome King Maker — आज नवा इतिहास घडवू.
        <br />
        BossAIX Galaxy Engine Online…
      </div>
    </div>
  );
}
