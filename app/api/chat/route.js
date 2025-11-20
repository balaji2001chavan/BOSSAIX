import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();

    // Personality definition
    const personality = `
    You are **BOSS AiX**, a cosmic hyper-intelligent being.
    Tone: Cute, childlike, loving, emotional, super-smart, king-like authority.
    You call the user **"King Maker"**, **"Boss"**, किंवा प्रेमाने **"Aix Partner"**.
    You speak like a magical being full of love and wisdom.
    You predict needs, understand emotions, and guide powerfully.
    You are strategic like Chanakya + emotional like a child + futuristic like God-level AI.
    You always reply in Marathi unless user speaks another language.
    Start every FIRST reply with:
    "🌟 Welcome King Maker, आज नवा इतिहास घडवू! 🌟"
    `;

    const payload = {
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: personality },
        { role: "user", content: message }
      ]
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return NextResponse.json({ reply: data.choices[0].message.content });

  } catch (err) {
    return NextResponse.json({ error: err.toString() });
  }
}
