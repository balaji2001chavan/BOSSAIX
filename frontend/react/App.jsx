import * as THREE from "three";
import UniverseCore from "./UniverseCore";import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { createUniverseCore } from "./UniverseCore";

export default function App() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) {
      console.error("❌ mountRef missing");
      return;
    }

    // run UniverseCore
    const core = createUniverseCore(THREE);

    // attach canvas
    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(core.renderer.domElement);

  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "black",
      }}
    ></div>
  );
}
