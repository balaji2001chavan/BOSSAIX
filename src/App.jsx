loader.load(
  "https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/space.jpg",
  (texture) => {
    const geometry = new THREE.SphereGeometry(1000, 64, 64);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    });
    const stars = new THREE.Mesh(geometry, material);
    scene.add(stars);
  }
);
