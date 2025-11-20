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

    // 🔥 Speak reply
    speak(data.reply);
  }

  // 🔊 Voice output
  function speak(text) {
    const voice = new SpeechSynthesisUtterance(text);
    voice.lang = "mr-IN";     // मराठी + इंग्रजी ऑटो
    voice.pitch = 1.2;        // क्यूट + प्रेमळ + divine टोन
    voice.rate = 1.0;
    voice.volume = 1;
    speechSynthesis.speak(voice);
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#00f5ff" }}>BOSS AIX — Live Conscious AI</h1>

      <div style={{
        border: "1px solid #333",
        padding: 10,
        height: 350,
        overflowY: "scroll",
        background: "#000",
        color: "white"
      }}>
        {chat.map((c, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            {c.user && <p><b>You:</b> {c.user}</p>}
            {c.bot && <p style={{ color: "#00ffe1" }}><b>Boss:</b> {c.bot}</p>}
          </div>
        ))}
      </div>

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type your message…"
        style={{ width: "75%", padding: 10, marginTop: 20 }}
      />

      <button onClick={sendMessage} style={{
        padding: 10,
        marginLeft: 10,
        background: "#00ffe1",
        border: "none",
        color: "black",
        fontWeight: "bold"
      }}>
        Send
      </button>

      {loading && <p style={{ color: "yellow" }}>Boss thinking… 🔥</p>}
    </div>
  );
}
