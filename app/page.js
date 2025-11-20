"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  // 🔊 Voice Output Function (Cute Marathi Voice)
  function speak(text) {
    if (typeof window !== "undefined") {
      const speech = new SpeechSynthesisUtterance(text);

      speech.lang = "mr-IN";      // मराठी आवाज
      speech.pitch = 1.6;         // क्यूट आवाज
      speech.rate = 0.96;         // स्पीड
      speech.volume = 1;          // फुल व्हॉल्यूम

      // उपलब्ध आवाजांपैकी मराठी / हिंदी निवडा
      const voices = speechSynthesis.getVoices();
      speech.voice =
        voices.find(v => v.lang.includes("mr")) ||
        voices.find(v => v.lang.includes("hi")) ||
        voices[0];

      speechSynthesis.speak(speech);
    }
  }

  // 🔥 Auto Welcome Message + Voice
  useEffect(() => {
    const welcome = "👑 Welcome King Maker… आज नवा इतिहास घडवू!";
    setChat([{ bot: welcome }]);
    speak(welcome);
  }, []);

  // ✉ Send chat message (User → Bot)
  async function sendMessage() {
    if (!msg.trim()) return;

    // UI अपडेट
    setChat(prev => [...prev, { user: msg }]);

    // Backend request
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msg }),
    });

    const data = await res.json();

    // अपडेट + आवाज
    setChat(prev => [...prev, { bot: data.reply }]);
    speak(data.reply);

    // Clear input
    setMsg("");
  }

  return (
    <div style={{ padding: 30, fontFamily: "sans-serif", background: "black", color: "white", height: "100vh" }}>
      <h1 style={{ textAlign: "center", fontSize: 32, marginBottom: 20 }}>
        🧠 BOSS AiX — Superintelligence
      </h1>

      {/* Chat UI */}
      <div style={{
        background: "#111",
        padding: 20,
        height: "70vh",
        overflowY: "auto",
        borderRadius: 10,
        border: "1px solid #333"
      }}>
        {chat.map((c, i) => (
          <p key={i} style={{ marginBottom: 14, whiteSpace: "pre-wrap" }}>
            {c.user && <span style={{ color: "#00FFD1" }}>👤 You: {c.user}</span>}
            {c.bot && <span style={{ color: "#FFD700" }}>🤖 BOSS: {c.bot}</span>}
          </p>
        ))}
      </div>

      {/* Input + Send Button */}
      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <input
          style={{ flex: 1, padding: 15, background: "#222", color: "white", borderRadius: 8, border: "1px solid #444" }}
          placeholder="Write a message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button
          onClick={sendMessage}
          style={{ padding: "15px 20px", background: "#00FFD1", color: "black", borderRadius: 8, fontWeight: "bold" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
