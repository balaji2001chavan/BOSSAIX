import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function runUniverseEngine(mount) {
  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
  );
  camera.position.set(0, 2, 6);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  mount.appendChild(renderer.domElement);

  // Controls (Touch + Mouse orbit)
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.4;
  controls.zoomSpeed = 0.6;

  // Load assets from repo
  const ASSETS =
    "https://raw.githubusercontent.com/balaji2001chavan/bossaix-assets/main";

  // ---------------- GALAXY BACKGROUND ----------------
  const galaxyGeo = new THREE.SphereGeometry(1200, 64, 64);
  const galaxyMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.15,
    side: THREE.BackSide
  });
  const galaxy = new THREE.Mesh(galaxyGeo, galaxyMat);
  scene.add(galaxy);

  // ---------------- STARS (Procedural) ----------------
  let stars;
  fetch(`${ASSETS}/stars/starfield.json`)
    .then((res) => res.json())
    .then((conf) => {
      const geo = new THREE.BufferGeometry();
      const pos = [];

      for (let i = 0; i < conf.count; i++) {
        const x = (Math.random() - 0.5) * conf.radius;
        const y = (Math.random() - 0.5) * conf.radius;
        const z = (Math.random() - 0.5) * conf.radius;
        pos.push(x, y, z);
      }

      geo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(pos, 3)
      );

      stars = new THREE.Points(
        geo,
        new THREE.PointsMaterial({ color: 0xffffff, size: 1 })
      );

      scene.add(stars);
    });

  // ---------------- LIGHT ----------------
  const sunLight = new THREE.PointLight(0xffffff, 3);
  sunLight.position.set(10, 10, 10);
  scene.add(sunLight);

  // ---------------- EARTH ----------------
  let earth;
  fetch(`${ASSETS}/planets/earth.json`)
    .then((res) => res.json())
    .then((json) => {
      const geo = new THREE.SphereGeometry(1, 64, 64);
      const mat = new THREE.MeshStandardMaterial({
        color: json.landColor,
        roughness: 0.6,
        metalness: 0.1
      });

      earth = new THREE.Mesh(geo, mat);
      earth.position.set(0, 0, 0);
      scene.add(earth);
    });

  // ---------------- MOON ----------------
  let moon;
  fetch(`${ASSETS}/planets/moon.json`)
    .then((res) => res.json())
    .then((conf) => {
      const geo = new THREE.SphereGeometry(0.27, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xbfbfbf
      });

      moon = new THREE.Mesh(geo, mat);
      scene.add(moon);
    });

  // ---------------- ANIMATION LOOP ----------------
  const animate = () => {
    requestAnimationFrame(animate);

    if (stars) stars.rotation.y += 0.0002;

    if (earth) earth.rotation.y += 0.002;

    if (moon && earth) {
      const t = Date.now() * 0.0004;
      moon.position.x = Math.cos(t) * 2.5;
      moon.position.z = Math.sin(t) * 2.5;
      moon.position.y = 0.1 * Math.sin(t * 2);
    }

    controls.update();
    renderer.render(scene, camera);
  };

  animate();

  // ---------------- RESIZE ----------------
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}
