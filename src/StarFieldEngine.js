// ---------------------------------------------------------
//   BOSS AIX – REAL STARFIELD ENGINE (50,000 STAR SYSTEM)
// ---------------------------------------------------------

export function createStarField(scene) {

    const starCount = 50000;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];

    for (let i = 0; i < starCount; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;

        positions.push(x, y, z);

        // random star colors
        const color = new THREE.Color();
        color.setHSL(Math.random(), 1, 0.8);
        colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
    );

    geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
    );

    const material = new THREE.PointsMaterial({
        size: 1,
        vertexColors: true,
        transparent: true,
        opacity: 0.9
    });

    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    return starField;
}
