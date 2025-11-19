"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { sender: "You", text: input }]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setMessages(prev => [...prev, { sender: "AI", text: data.reply }]);
    setInput("");
  }

  return (
    <div style={{
      background: "#000",
      color: "#00ffff",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: "20px"
    }}>
      
      <h1 style={{ textAlign: "center", fontSize: "30px" }}>🔥 BOSS AIX AI CHAT</h1>

      <div style={{
        flex: 1,
        overflowY: "auto",
        border: "1px solid #00ffff",
        padding: "10px",
        marginBottom: "20px"
      }}>
        {messages.map((msg, i) => (
          <p key={i}>
            <b>{msg.sender}:</b> {msg.text}
          </p>
        ))}
      </div>

      <div style={{ display: "flex" }}>
        <input 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your command..."
          style={{
            flex: 1,
            padding: "10px",
            background: "#111",
            border: "1px solid #00ffff",
            color: "#00ffff"
          }}
        />
        <button 
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            background: "#00ffff",
            color: "#000",
            marginLeft: "10px",
            fontWeight: "bold"
          }}
        >Send</button>
      </div>

    </div>
  );
}
