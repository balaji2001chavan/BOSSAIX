"use client";

import { useState } from "react";

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const API_URL = "https://bossaix.onrender.com/api/chat";

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages([...messages, userMessage]);

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    setMessages(prev => [...prev, { role: "ai", text: data.reply }]);
    setInput("");
  }

  return (
    <div style={{
      background: "#000",
      color: "#00f6ff",
      height: "100vh",
      padding: "20px",
      fontFamily: "sans-serif"
    }}>
      <h2>BOSS AIX AI CHAT 🔥</h2>

      <div style={{
        height: "80vh",
        overflowY: "auto",
        border: "1px solid #00f6ff",
        padding: "10px",
        marginBottom: "10px"
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: "10px 0" }}>
            <b style={{ color: msg.role === "user" ? "cyan" : "yellow" }}>
              {msg.role.toUpperCase()}
            </b>
            : {msg.text}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type a message..."
        style={{
          width: "70%",
          padding: "10px",
          border: "1px solid #00f6ff",
          background: "#111",
          color: "white"
        }}
      />

      <button onClick={sendMessage} style={{
        padding: "10px 20px",
        marginLeft: "10px",
        background: "#00f6ff",
        border: "none",
        color: "#000",
        fontWeight: "bold"
      }}>
        Send
      </button>
    </div>
  );
}
