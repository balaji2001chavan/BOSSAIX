import * as THREE from "three";

export function runUniverseEngine(mount) {
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

  // ---------- LOAD ASSETS FROM YOUR REPO ----------
  const ASSETS = "https://raw.githubusercontent.com/balaji2001chavan/bossaix-assets/main";

  // Stars (Procedural)
  fetch(`${ASSETS}/stars/starfield.json`)
    .then(res => res.json())
    .then(starConf => {
      const starGeometry = new THREE.BufferGeometry();
      const starPositions = [];

      for (let i = 0; i < starConf.count; i++) {
        const x = (Math.random() - 0.5) * starConf.radius;
        const y = (Math.random() - 0.5) * starConf.radius;
        const z = (Math.random() - 0.5) * starConf.radius;
        starPositions.push(x, y, z);
      }

      starGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(starPositions, 3)
      );

      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.7
      });

      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
    });

  // ---------- Earth ----------
  fetch(`${ASSETS}/planets/earth.json`)
    .then(res => res.json())
    .then(earthConf => {
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: earthConf.landColor
      });

      const earth = new THREE.Mesh(geometry, material);
      earth.position.set(0, 0, -5);
      scene.add(earth);

      // Light
      const light = new THREE.PointLight(0xffffff, 2);
      light.position.set(5, 5, 5);
      scene.add(light);

      // Animate Earth
      function animateEarth() {
        earth.rotation.y += 0.002;
        requestAnimationFrame(animateEarth);
      }
      animateEarth();
    });

  // ---------- Moon ----------
  fetch(`${ASSETS}/planets/moon.json`)
    .then(res => res.json())
    .then(config => {
      const moonGeo = new THREE.SphereGeometry(0.27, 32, 32);
      const moonMat = new THREE.MeshStandardMaterial({ color: 0xbfbfbf });

      const moon = new THREE.Mesh(moonGeo, moonMat);
      moon.position.set(1.5, 0, -5);
      scene.add(moon);

      function animateMoon() {
        moon.rotation.y += 0.003;
        requestAnimationFrame(animateMoon);
      }
      animateMoon();
    });

  // ---------- Animate Scene ----------
  const animate = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();

  // Resize
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}
