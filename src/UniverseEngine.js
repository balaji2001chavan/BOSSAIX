import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function runUniverseEngine(mount) {

  // -------------------- SCENE --------------------
  const scene = new THREE.Scene();

  // -------------------- CAMERA --------------------
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
  );
  camera.position.set(0, 2, 8);

  // -------------------- RENDERER --------------------
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  mount.appendChild(renderer.domElement);

  // -------------------- CAMERA CONTROLS --------------------
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.5;
  controls.zoomSpeed = 0.8;

  // -------------------- SKYBOX (REAL GALAXY) --------------------
  const galaxyTexture = new THREE.TextureLoader().load(
    "https://raw.githubusercontent.com/matiasvasquez/threejs-galaxy/master/textures/galaxy.png"
  );
  const galaxyGeo = new THREE.SphereGeometry(2000, 64, 64);
  const galaxyMat = new THREE.MeshBasicMaterial({
    map: galaxyTexture,
    side: THREE.BackSide,
    opacity: 0.9,
    transparent: true
  });
  const galaxy = new THREE.Mesh(galaxyGeo, galaxyMat);
  scene.add(galaxy);

  // -------------------- SUN (GLOW) --------------------
  const sunTexture = new THREE.TextureLoader().load(
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/sprites/sun.png"
  );
  const sunGeo = new THREE.SphereGeometry(2.5, 64, 64);
  const sunMat = new THREE.MeshBasicMaterial({ map: sunTexture });
  const sun = new THREE.Mesh(sunGeo, sunMat);
  sun.position.set(15, 0, -10);
  scene.add(sun);

  const sunLight = new THREE.PointLight(0xffffff, 3, 300);
  sunLight.position.copy(sun.position);
  scene.add(sunLight);

  // -------------------- EARTH (HD TEXTURES) --------------------
  const earthGeo = new THREE.SphereGeometry(1.4, 64, 64);

  const earthDay = new THREE.TextureLoader().load(
    "https://raw.githubusercontent.com/hampusborgos/earth-reverse-map/master/assets/8k_earth_daymap.jpg"
  );
  const earthNight = new THREE.TextureLoader().load(
    "https://raw.githubusercontent.com/hampusborgos/earth-reverse-map/master/assets/8k_earth_nightmap.jpg"
  );
  const earthClouds = new THREE.TextureLoader().load(
    "https://raw.githubusercontent.com/hampusborgos/earth-reverse-map/master/assets/8k_earth_clouds.png"
  );

  const earthMat = new THREE.MeshStandardMaterial({
    map: earthDay,
    emissiveMap: earthNight,
    emissiveIntensity: 1.5
  });

  const earth = new THREE.Mesh(earthGeo, earthMat);
  earth.position.set(0, 0, 0);
  scene.add(earth);

  // Earth Clouds Layer
  const cloudGeo = new THREE.SphereGeometry(1.42, 64, 64);
  const cloudMat = new THREE.MeshStandardMaterial({
    map: earthClouds,
    transparent: true,
    opacity: 0.8
  });
  const clouds = new THREE.Mesh(cloudGeo, cloudMat);
  earth.add(clouds);

  // -------------------- MOON (HD) --------------------
  const moonTexture = new THREE.TextureLoader().load(
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/moon_1024.jpg"
  );

  const moonGeo = new THREE.SphereGeometry(0.4, 64, 64);
  const moonMat = new THREE.MeshStandardMaterial({
    map: moonTexture,
    roughness: 1
  });
  const moon = new THREE.Mesh(moonGeo, moonMat);
  scene.add(moon);

  // -------------------- ANIMATION --------------------
  function animate() {
    requestAnimationFrame(animate);

    // Galaxy rotation
    galaxy.rotation.y += 0.0002;

    // Earth rotation
    earth.rotation.y += 0.002;
    clouds.rotation.y += 0.0015;

    // Moon orbit
    const t = Date.now() * 0.0004;
    moon.position.x = Math.cos(t) * 4;
    moon.position.z = Math.sin(t) * 4;
    moon.position.y = 0.6 * Math.sin(t * 2);

    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  // -------------------- RESIZE --------------------
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}
