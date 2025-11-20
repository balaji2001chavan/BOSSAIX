"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  let recognition;

  if (typeof window !== "undefined") {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = "mr-IN"; // भाषा
    recognition.continuous = false;
    recognition.interimResults = false;
  }

  function startListening() {
    setListening(true);
    recognition.start();
  }

  recognition.onend = () => setListening(false);

  recognition.onresult = (event) => {
    const spokenText = event.results[0][0].transcript;
    setInput(spokenText);
    sendToAI(spokenText);
  };

  async function sendToAI(text) {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const audioBlob = await res.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", textAlign: "center" }}>
      <h1>👑 BOSS AiX — Voice Chat</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type or speak…"
        style={{
          width: "90%",
          padding: "12px",
          fontSize: "18px",
          borderRadius: "10px",
          border: "2px solid #444",
          marginBottom: "10px"
        }}
      />

      <br/><br/>

      <button
        onClick={() => sendToAI(input)}
        style={{ padding: "12px 25px", fontSize: "18px", background: "black", color:"white", borderRadius:"10px" }}
      >
        🚀 Send
      </button>

      <br/><br/>

      <button
        onClick={startListening}
        style={{
          padding: "15px 25px",
          fontSize: "22px",
          background: listening ? "red" : "#0a84ff",
          color: "white",
          borderRadius: "50px"
        }}
      >
        🎙 बोल
      </button>

      {listening && <p>🛑 Listening...</p>}
    </div>
  );
}
