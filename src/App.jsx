import React, { useEffect, useRef } from "react";
import { runUniverseEngine } from "./UniverseEngine";

export default function App() {
  const mountRef = useRef(null);

  useEffect(() => {
    runUniverseEngine(mountRef.current);
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
      }}
    ></div>
  );
}
