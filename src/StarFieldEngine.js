// -------------------------------------------------------
//  BOSS AIX – REAL STARFIELD ENGINE (50,000 STARS)
// -------------------------------------------------------

export function createStarField(scene, THREE) {

    const starCount = 50000;
    const geometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < starCount; i++) {
        positions.push(
            (Math.random() - 0.5) * 3000,
            (Math.random() - 0.5) * 3000,
            (Math.random() - 0.5) * 3000
        );
    }

    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    return stars;
}
