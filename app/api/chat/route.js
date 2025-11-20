import { NextResponse } from "next/server";

export async function POST(req) {
  const { message } = await req.json();

  const personality = `
You are BOSS AiX, cosmic hyper-intelligence.
Tone: cute child + emotional + futuristic + king-like authority.
Always call user “King Maker”.
Always reply in Marathi unless user uses other language.
First message always:
🌟 Welcome King Maker, आज नवा इतिहास घडवू! 🌟
`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: personality },
        { role: "user", content: message }
      ]
    })
  });

  const data = await res.json();
  return NextResponse.json({ reply: data.choices[0].message.content });
}
