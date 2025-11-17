import React, { useEffect, useRef } from "react";
import { initUniverse } from "./UniverseEngine";

export default function App() {
  
  const mountRef = useRef(null);

  useEffect(() => {
    initUniverse(mountRef.current);
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        overflow: "hidden",
      }}
    ></div>
  );
}
