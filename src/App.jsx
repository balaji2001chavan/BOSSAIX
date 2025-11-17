import React, { useEffect, useRef } from "react";
import * as THREE from "three";

import { createUniverseCore } from "./UniverseCore";

export default function App() {
    const mountRef = useRef(null);

    useEffect(() => {
        // Build the core engine
        const { renderer } = createUniverseCore(THREE);

        // Attach canvas to the screen
        mountRef.current.appendChild(renderer.domElement);

    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                background: "black"
            }}
        ></div>
    );
}
