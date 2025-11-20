"use client";
import { useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  async function sendMessage() {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });

    const data = await res.json();
    setChat([...chat, { user: msg, bot: data.reply }]);
    setMsg("");
  }

  return (
    <div style={{ padding: 30, color: "white", background: "black", height: "100vh" }}>
      <h1>🔥 BOSS AiX</h1>

      <div>
        {chat.map((c, i) => (
          <p key={i}><b>You:</b> {c.user}<br/><b>Boss:</b> {c.bot}</p>
        ))}
      </div>

      <input
        value={msg}
        onChange={e => setMsg(e.target.value)}
        placeholder="Type message..."
        style={{ width: "80%", padding: 10 }}
      />

      <button onClick={sendMessage} style={{ padding: 10, marginLeft: 10 }}>
        Send
      </button>
    </div>
  );
}
