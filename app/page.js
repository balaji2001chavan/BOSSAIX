"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    const botMsg = { role: "assistant", content: data.reply };
    setMessages(prev => [...prev, botMsg]);
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

      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Speak to the Kingmaker..."
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
      </div>
    </main>
  );
}
