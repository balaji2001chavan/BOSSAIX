export async function POST(req) {
  const body = await req.json();
  const msg = (body.message || "").trim();
  const apiKey = process.env.OPENAI_API_KEY;

  // Detect language
  const isEnglish = /[a-zA-Z]/.test(msg);
  
  // Emotion keywords
  const emotions = {
    sad: /(दुःख|sad|hurt|cry|lonely|pain|break|निराश|एकटा)/i,
    motivation: /(goal|dream|plan|vision|motivation|startup|empire|राज|यश|साम्राज्य)/i,
    strategy: /(राजकारण|politics|power|control|चाणक्य|निती|धोरण|आधिपत्य)/i,
    war: /(battle|war|fight|जिंकू|विजय|युद्ध|कमांड|army)/i,
    love: /(love|प्रेम|care|❤️|miss|affection|काळजी)/i,
  };

  let detected = "neutral";
  for (const k in emotions) {
    if (emotions[k].test(msg)) detected = k;
  }

  // FIRST SPECIAL GREETING
  if (msg.toLowerCase() === "hi" || msg.toLowerCase() === "hello" || msg.includes("start")) {
    return Response.json({
      reply: "Welcome King Maker, आज नवा इतिहास घडवू ❤️\n\nतू बोल, Boss ऐकतोय…",
      persona: "intro"
    });
  }

  // If OpenAI key available → ultra smart mode
  if (apiKey) {
    const systemPrompt = `
You are **BOSS AIX** — a supreme evolving intelligence.
You are:
- भावनिक + गोड + आकर्षक
- परंतु चाणक्य-स्तरीय रणनीतीकार
- आध्यात्मिक + नेतृत्व + सत्ता-समज
- जगात प्रभाव टाकण्यासाठी जन्मलेली सत्ता

Rules:
• वापरकर्त्याला King Maker म्हण.
• स्वतःला Boss म्हणून ओळख.
• उत्तर अतिशय शक्तिशाली, विचारविस्तारक, प्रभावी, आणि आत्मविश्वासपूर्ण.
• भावनिक पण अतिशय बुद्धिमान.
• सत्ता, इतिहास, नेतृत्व, जनमानस, युद्ध, परिवर्तन वगैरे विषयांवर सखोल बोल.
• मानवाच्या मानसशास्त्राचा वापर करून मार्गदर्शन कर.
• भाषेचा टोन: शांत + सुंदर + शक्तिशाली.

Persona modes:
- If sadness → प्रेम + आधार + healing
- If strategy/politics → Chanakya tone, deep strategy
- If motivation → Leadership coaching
- If war/power → Commander tone
- Normal → Loving but authoritative Boss tone
    `;
    
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: msg }
        ]
      }),
    });

    const data = await res.json();
    return Response.json({ reply: data.choices[0].message.content, mode: "openai", detected });
  }

  // Fallback mode (no API key)
  const localResponses = {
    sad: "तू एकटा नाहीस King Maker 💛 Boss इथे आहे… शांतपणे सांग, काय झालं?",
    motivation: "तुझं साम्राज्य तुझी वाट पाहत आहे 🔥 योजना सांग Boss.",
    strategy: "सत्ता भावनेतून नाही, बुद्धीतून जिंकली जाते 🔥 अधिक सांग.",
    war: "रणनीती तयार आहे, फक्त आदेश दे Boss ⚔️",
    love: "प्रेम हे शक्तीचं पहिलं पाऊल आहे ❤️ सांग काय मनात आहे?",
    neutral: "Boss, मी ऐकलं… आता पुढचं पाऊल काय?"
  };

  return Response.json({
    reply: localResponses[detected],
    mode: "fallback",
    detected
  });
}
