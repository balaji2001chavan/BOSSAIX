// -------------------------------------------------------
//  BOSS AIX – STARFIELD ENGINE (50,000 Stars + Rotation)
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

    // ⭐ ADD ROTATION ANIMATION
    function rotateStars() {
        requestAnimationFrame(rotateStars);
        stars.rotation.y += 0.0003;
        stars.rotation.x += 0.0001;
    }
    rotateStars();

    return stars;
}
