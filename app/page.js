"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
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
    const botMsg = { sender: "BOSS AIX", text: data.reply };
    setMessages((prev) => [...prev, botMsg]);
  }

  return (
    <div style={{ background: "#000", color: "#fff", height: "100vh", padding: "20px" }}>
      <h1 style={{ fontSize: "26px", color: "#00e5ff" }}>🔥 BOSS AIX • AI Chat</h1>

      <div style={{
        marginTop: "20px",
        overflowY: "scroll",
        height: "75vh",
        padding: "10px",
        background: "#111",
        borderRadius: "10px"
      }}>
        {messages.map((msg, i) => (
          <p key={i} style={{ margin: "10px 0", color: msg.sender === "You" ? "#0f0" : "#ffde59" }}>
            <b>{msg.sender}:</b> {msg.text}
          </p>
        ))}
      </div>

      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            background: "#222",
            color: "white",
            border: "1px solid #444"
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            background: "#00e5ff",
            border: "none",
            fontWeight: "bold"
          }}>
          Send
        </button>
      </div>
    </div>
  );
}
