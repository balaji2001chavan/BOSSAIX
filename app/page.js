"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // --- Voice Output ---
  function speak(text) {
    const v = new SpeechSynthesisUtterance(text);
    v.lang = "mr-IN";
    v.rate = 0.95;
    v.pitch = 1.4;
    v.volume = 1;
    speechSynthesis.speak(v);
  }

  // Auto welcome voice
  useEffect(() => {
    speak("🌟 Welcome King Maker, आज नवा इतिहास घडवू! 🌟");
  }, []);

  // --- Voice Input ---
  function startListening() {
    const recog = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recog.lang = "mr-IN";
    recog.onresult = (e) => setInput(e.results[0][0].transcript);
    recog.start();
  }

  // --- Send Message ---
  async function sendMessage() {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: "user", content: input }]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    setInput("");

    const data = await res.json();

    // Add bot message
    setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);

    // Speak response
    speak(data.reply);
  }

  return (
    <main style={{
      background: "black",
      color: "white",
      height: "100vh",
      padding: "20px",
      fontFamily: "Arial"
    }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        🔥 BOSS AiX — Universal Intelligence
      </h1>

      {/* Chat Window */}
      <div style={{
        border: "1px solid #555",
        padding: "10px",
        height: "70vh",
        overflowY: "scroll",
        background: "#111"
      }}>
        {messages.map((msg, i) => (
          <p key={i}>
            <b style={{ color: msg.role === "user" ? "#0f0" : "#0ff" }}>
              {msg.role === "user" ? "You" : "BOSS"}:
            </b> {msg.content}
          </p>
        ))}
      </div>

      {/* Input Controls */}
      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Speak to your universe..."
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "18px",
            background: "#222",
            border: "1px solid #444",
            color: "white"
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            background: "purple",
            border: "none",
            color: "white",
            cursor: "pointer"
          }}
        >
          Send
        </button>

        <button
          onClick={startListening}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            background: "red",
            border: "none",
            color: "white",
            cursor: "pointer"
          }}
        >
          🎤
        </button>
      </div>
    </main>
  );
}
