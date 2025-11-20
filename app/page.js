"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // 🔹 Voice Playback Function
  async function speak(text) {
    try {
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const audioData = await res.arrayBuffer();
      const blob = new Blob([audioData], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();

    } catch (err) {
      console.error("Voice error:", err);
    }
  }

  // 🔹 Send Message Handler
  async function handleSend() {
    if (!input.trim()) return;

    const userMsg = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const botMsg = {
      sender: "BOSS AIX",
      text: data.reply,
    };

    setMessages((prev) => [...prev, botMsg]);

    // 🔥 Voice Output
    speak(data.reply);
  }

  return (
    <div style={{
      background: "#000",
      color: "#0ff",
      height: "100vh",
      padding: "20px",
      fontFamily: "monospace"
    }}>
      
      <h1 style={{ textAlign: "center", fontSize: "28px" }}>
        🔥 BOSS AIX — The Living Intelligence
      </h1>

      {/* Chat Box */}
      <div style={{
        height: "75vh",
        overflowY: "auto",
        border: "1px solid #0ff",
        padding: "10px",
        marginTop: "20px"
      }}>
        {messages.map((msg, idx) => (
          <p key={idx} style={{ margin: "10px 0" }}>
            <strong>{msg.sender}: </strong>{msg.text}
          </p>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ display: "flex", marginTop: "20px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Speak to your AI King..."
          style={{
            flex: 1,
            padding: "10px",
            background: "#111",
            color: "#0ff",
            border: "1px solid #0ff"
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "10px 20px",
            background: "#0ff",
            color: "#000",
            fontWeight: "bold",
            border: "none"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
