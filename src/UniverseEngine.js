import * as THREE from "three";

export function runUniverseEngine(mount) {

  // SCENE
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
  renderer.setPixelRatio(1.5);
  mount.appendChild(renderer.domElement);

  // LIGHT
  const light = new THREE.PointLight(0xffffff, 2);
  light.position.set(10, 10, 10);
  scene.add(light);

  // ---------------- GALAXY BACKGROUND ----------------
  const galaxyTexture = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/planets/starfield.jpg"
  );

  const galaxyGeo = new THREE.SphereGeometry(1500, 32, 32);
  const galaxyMat = new THREE.MeshBasicMaterial({
    map: galaxyTexture,
    side: THREE.BackSide
  });

  const galaxy = new THREE.Mesh(galaxyGeo, galaxyMat);
  scene.add(galaxy);

  // ---------------- EARTH ----------------
  const earthGeo = new THREE.SphereGeometry(1.3, 32, 32);
  const earthTexture = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
  );

  const earthMat = new THREE.MeshStandardMaterial({
    map: earthTexture
  });

  const earth = new THREE.Mesh(earthGeo, earthMat);
  earth.position.set(0, 0, 0);
  scene.add(earth);

  // ---------------- MOON ----------------
  const moonGeo = new THREE.SphereGeometry(0.35, 32, 32);
  const moonTexture = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/planets/moon_1024.jpg"
  );

  const moonMat = new THREE.MeshStandardMaterial({
    map: moonTexture
  });

  const moon = new THREE.Mesh(moonGeo, moonMat);
  scene.add(moon);

  // ---------------- ANIMATION ----------------
  function animate() {
    requestAnimationFrame(animate);

    earth.rotation.y += 0.002;

    const t = Date.now() * 0.0004;
    moon.position.x = Math.cos(t) * 3;
    moon.position.z = Math.sin(t) * 3;

    renderer.render(scene, camera);
  }

  animate();

  // ---------------- RESIZE ----------------
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}
