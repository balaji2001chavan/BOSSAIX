"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    // Ensure this code runs ONLY in browser
    if (typeof window !== "undefined") {
      const speak = (text) => {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "mr-IN";
        speech.rate = 1;
        
        speech.onend = () => {
          console.log("Speech finished");
        };

        window.speechSynthesis.speak(speech);
      };

      // Welcome message
      speak("Welcome King Maker, आज नवा इतिहास घडवू!");
    }
  }, []);

  return (
    <h1>🔥 BOSS AIX LOADED 🔥</h1>
  );
}
