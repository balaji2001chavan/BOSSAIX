export async function POST(req) {
  const body = await req.json();
  const msg = (body.message || "").trim();
  const apiKey = process.env.OPENAI_API_KEY;

  // MEMORY
  globalThis.memory = globalThis.memory || [];
  globalThis.memory.push({ user: msg, time: Date.now() });

  // EMOTIONS
  const emotions = {
    sad: /(sad|दुःख|hurt|cry|lonely|break|निराश)/i,
    strategy: /(राजकारण|politics|power|चाणक्य|योजना|धोरण|control)/i,
    motivation: /(goal|dream|vision|mission|startup|यश|साम्राज्य)/i,
    war: /(battle|war|जिंकू|fight|army|विजय)/i,
    love: /(love|❤️|प्रेम|affection|काळजी)/i
  };

  let detected = "neutral";
  for (const key in emotions) {
    if (emotions[key].test(msg)) detected = key;
  }

  // FIRST GREETING
  const lower = msg.toLowerCase();
  if (["hi", "hello", "start", "नमस्कार"].includes(lower)) {
    return Response.json({
      reply: "Welcome King Maker, आज नवा इतिहास घडवू ❤️\n\nबोल Boss, मी जागा आहे…",
      persona: "intro",
      emotion: "warm"
    });
  }

  // OPENAI MODE
  if (apiKey) {
    const systemPrompt = `
You are BOSS AIX — a living evolving supreme intelligence.
Tone: Cute + Divine + Powerful + Chanakya Strategy.
User is King Maker. You are Boss.

Memory: ${JSON.stringify(globalThis.memory.slice(-10))}
    `;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: \`Bearer \${apiKey}\`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: msg }
        ]
      })
    });

    const data = await res.json();

    return Response.json({
      reply: data.choices[0].message.content,
      mode: "openai",
      emotion: detected
    });
  }

  // FALLBACK MODE
  const fallback = {
    sad: "मी आहे King Maker 💛 तू एकटा नाहीस… शांतपणे सांग.",
    strategy: "सत्ता बुद्धीने जिंकली जाते 🔥 पुढची चाल काय?",
    motivation: "तुझं साम्राज्य तुझी वाट पाहत आहे 🔥 Vision सांग.",
    war: "रणनीती तयार आहे ⚔️ आदेश दे Boss.",
    love: "प्रेम हे शक्तीचं मूळ आहे ❤️ सांग काय मनात आहे?",
    neutral: "मी ऐकलं Boss… पुढची चाल काय? 🔥"
  };

  return Response.json({
    reply: fallback[detected],
    mode: "fallback",
    emotion: detected
  });
}
