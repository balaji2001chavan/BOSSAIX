import * as THREE from "three";

export function runUniverseEngine(mount) {

  // SCENE
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // CAMERA
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // RENDERER
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  mount.appendChild(renderer.domElement);

  // LIGHT (Sun-like)
  const light = new THREE.PointLight(0xffffff, 2);
  light.position.set(10, 10, 10);
  scene.add(light);

  // 🌍 EARTH
  const earthGeo = new THREE.SphereGeometry(1.3, 32, 32);
  const earthMat = new THREE.MeshStandardMaterial({ color: 0x3498db });
  const earth = new THREE.Mesh(earthGeo, earthMat);
  scene.add(earth);

  // 🌙 MOON
  const moonGeo = new THREE.SphereGeometry(0.35, 32, 32);
  const moonMat = new THREE.MeshStandardMaterial({ color: 0xe0e0e0 });
  const moon = new THREE.Mesh(moonGeo, moonMat);
  scene.add(moon);

  // ⭐ STARFIELD (GUARANTEED WORKING - NO TEXTURES)
  function addStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03
    });

    const starVertices = [];
    for (let i = 0; i < 2000; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      starVertices.push(x, y, z);
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
  }

  addStars();

  // ANIMATION
  function animate() {
    requestAnimationFrame(animate);

    earth.rotation.y += 0.01;

    const t = Date.now() * 0.0004;
    moon.position.x = Math.cos(t) * 3;
    moon.position.z = Math.sin(t) * 3;

    renderer.render(scene, camera);
  }

  animate();

  // RESIZE
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}
