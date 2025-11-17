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

  // GLOBAL OBJECTS
  let earth = null;
  let moon = null;
  let stars = null;

  const loader = new THREE.TextureLoader();

  // Load starfield
  fetch(
    "https://raw.githubusercontent.com/balaji2001chavan/bossaix-assets/main/stars/starfield.json"
  )
    .then((res) => res.json())
    .then((starConf) => {
      const starGeo = new THREE.BufferGeometry();
      const starPositions = [];

      for (let i = 0; i < starConf.count; i++) {
        const x = (Math.random() - 0.5) * starConf.radius;
        const y = (Math.random() - 0.5) * starConf.radius;
        const z = (Math.random() - 0.5) * starConf.radius;
        starPositions.push(x, y, z);
      }

      starGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(starPositions, 3)
      );

      const starMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.8,
      });

      stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);
    });

  // Light
  const light = new THREE.PointLight(0xffffff, 2);
  light.position.set(5, 5, 5);
  scene.add(light);

  // Earth
  fetch(
    "https://raw.githubusercontent.com/balaji2001chavan/bossaix-assets/main/planets/earth.json"
  )
    .then((r) => r.json())
    .then(() => {
      const geo = new THREE.SphereGeometry(1, 32, 32);
      const mat = new THREE.MeshStandardMaterial({ color: 0x1ca53a });

      earth = new THREE.Mesh(geo, mat);
      earth.position.set(0, 0, -5);
      scene.add(earth);
    });

  // Moon
  fetch(
    "https://raw.githubusercontent.com/balaji2001chavan/bossaix-assets/main/planets/moon.json"
  )
    .then((r) => r.json())
    .then(() => {
      const mGeo = new THREE.SphereGeometry(0.27, 32, 32);
      const mMat = new THREE.MeshStandardMaterial({ color: 0xbfbfbf });

      moon = new THREE.Mesh(mGeo, mMat);
      moon.position.set(2, 0, -5);
      scene.add(moon);
    });

  // ANIMATE EVERYTHING
  const animate = () => {
    if (stars) stars.rotation.y += 0.0005;

    if (earth) earth.rotation.y += 0.002;

    if (moon && earth) {
      const t = Date.now() * 0.0005;
      moon.position.x = earth.position.x + Math.cos(t) * 2;
      moon.position.z = earth.position.z + Math.sin(t) * 2;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}
