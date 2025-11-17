import * as THREE from "three";

export function runUniverseEngine(mount) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  mount.appendChild(renderer.domElement);

  // LIGHT
  const light = new THREE.PointLight(0xffffff, 2);
  light.position.set(5, 5, 5);
  scene.add(light);

  // EARTH
  const earthGeo = new THREE.SphereGeometry(1.3, 32, 32);
  const earthMat = new THREE.MeshStandardMaterial({ color: 0x3399ff });
  const earth = new THREE.Mesh(earthGeo, earthMat);
  scene.add(earth);

  // MOON
  const moonGeo = new THREE.SphereGeometry(0.35, 32, 32);
  const moonMat = new THREE.MeshStandardMaterial({ color: 0xcccccc });
  const moon = new THREE.Mesh(moonGeo, moonMat);
  scene.add(moon);

  function animate() {
    requestAnimationFrame(animate);

    earth.rotation.y += 0.008;

    const t = Date.now() * 0.0005;
    moon.position.x = Math.cos(t) * 3;
    moon.position.z = Math.sin(t) * 3;

    renderer.render(scene, camera);
  }

  animate();
}
