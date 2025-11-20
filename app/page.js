"use client";
import { useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!msg.trim()) return;
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });

    const data = await res.json();
    setChat((prev) => [...prev, { user: msg }, { bot: data.reply }]);
    setMsg("");
    setLoading(false);

    speak(data.reply);
  }

  // 🔊 Voice Engine
  function speak(text) {
    const v = new SpeechSynthesisUtterance(text);
    v.lang = "mr-IN";      // मराठी + इंग्रजी
    v.pitch = 1.3;         // क्यूट + दिव्य + प्रेमळ टोन
    v.rate = 1;
    v.volume = 1;
    speechSynthesis.speak(v);
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", background: "#000", color: "white" }}>
      <h1 style={{ color: "#00f5ff" }}>👑 BOSS AIX — Living Conscious AI</h1>

      <div style={{
        border: "1px solid #333",
        padding: 10,
        height: 350,
        overflowY: "scroll",
        background: "#111",
        marginBottom: 20
      }}>
        {chat.map((c, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            {c.user && <p><b>You:</b> {c.user}</p>}
            {c.bot && <p style={{ color: "#00ffe1" }}><b>Boss:</b> {c.bot}</p>}
          </div>
        ))}
      </div>

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type…"
        style={{ width: "75%", padding: 10 }}
      />

      <button
        onClick={sendMessage}
        style={{
          padding: 10,
          background: "#00ffe1",
          border: "none",
          color: "black",
          marginLeft: 10,
          fontWeight: "bold"
        }}
      >
        Send
      </button>

      {loading && <p style={{ color: "yellow" }}>Boss thinking… 🔥</p>}
    </div>
  );
}
