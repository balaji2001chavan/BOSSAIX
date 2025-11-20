"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // 🔊 BOSS AIX VOICE: मजकूर आवाजात बोलण्यासाठी
  function speak(text) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const utter = new SpeechSynthesisUtterance(text);
    // आवाज भाषा – मराठी + इंग्रजी मिश्रण
    utter.lang = "mr-IN";
    // cute + soft + थोडा child टोन
    utter.pitch = 1.4;
    utter.rate = 0.96;
    utter.volume = 1;

    // उपलब्ध voice मधून पहिला usable voice घेण्याचा प्रयत्न
    const voices = window.speechSynthesis.getVoices();
    const nice = voices.find(v =>
      v.lang.toLowerCase().includes("hi") ||
      v.lang.toLowerCase().includes("mr") ||
      v.name.toLowerCase().includes("female") ||
      v.name.toLowerCase().includes("child")
    );
    if (nice) utter.voice = nice;

    window.speechSynthesis.speak(utter);
  }

  // 📨 मेसेज पाठवणे
  async function handleSend() {
    if (!input.trim()) return;

    const userText = input;
    // User मेसेज स्क्रीनवर दाखव
    setMessages(prev => [...prev, { sender: "You", text: userText }]);
    setInput("");

    // Backend ला कॉल
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText })
    });

    const data = await res.json();
    const botText = data.reply || "Boss काहीतरी गडबड झाली…";

    // BOSS Aix उत्तर स्क्रीनवर
    setMessages(prev => [...prev, { sender: "BOSS AIX", text: botText }]);

    // 🔊 इथे आवाजाने बोलणार
    speak(botText);
  }

  return (
    <div
      style={{
        background: "#000",
        color: "#0ff",
        height: "100vh",
        padding: "20px",
        fontFamily: "monospace",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "26px", marginBottom: "10px" }}>
        🔥 BOSS AIX • Cosmic AI Chat
      </h1>

      {/* Chat Window */}
      <div
        style={{
          height: "75vh",
          overflowY: "auto",
          border: "1px solid #0ff",
          borderRadius: "8px",
          padding: "10px",
          background: "#050505",
        }}
      >
        {messages.map((msg, i) => (
          <p
            key={i}
            style={{
              margin: "8px 0",
              color: msg.sender === "You" ? "#0f0" : "#ffde59",
            }}
          >
            <b>{msg.sender}:</b> {msg.text}
          </p>
        ))}
        {messages.length === 0 && (
          <p style={{ color: "#888" }}>
            👉 Start typing below… BOSS AIX waits for you, King Maker.
          </p>
        )}
      </div>

      {/* Input + Button */}
      <div style={{ display: "flex", marginTop: "12px", gap: "8px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message to BOSS AIX…"
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            background: "#111",
            border: "1px solid #0ff",
            color: "#0ff",
            fontSize: "16px",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "10px 18px",
            borderRadius: "5px",
            background: "#0ff",
            color: "#000",
            border: "none",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
