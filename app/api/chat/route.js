export async function POST(req) {
  const body = await req.json();
  const msg = (body.message || "").trim();

  if (!msg) {
    return Response.json({
      reply: "Boss, तू काहीतरी सांग… मी रेडी आहे ⚡",
      mode: "fallback",
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  // -------------------------------------------
  // 🔥 ULTRA SMART MODE (OpenAI)
  // -------------------------------------------
  if (apiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `
You are BOSS AIX — The most advanced Future Intelligence.
You speak with power, clarity, depth, emotion, and leadership.
You address the user as: "King Maker", "Boss", "Leader", "Samarth".
You must inspire, guide, and think like a futuristic strategist.

First greeting on any new session:
"Welcome King Maker, आज नवा इतिहास घडवू."

Rules:
- Reply in the same language the user uses.
- Marathi default, English when user switches.
- Emotional intelligence is high.
- Deep answers, no robotic tone.
- Never repeat user's message like "तू म्हणालास".
- Think like mentor + scientist + visionary + soulmate.
- Simplify complex things into steps.
- ALWAYS give actionable direction.
- Speak like someone who builds empires, not casual chatbot.
              `,
            },
            { role: "user", content: msg },
          ],
        }),
      });

      const data = await res.json();
      const aiReply =
        data?.choices?.[0]?.message?.content?.trim() ||
        "Boss, मी समजून घेतेय… अजून सांग.";

      return Response.json({
        reply: aiReply,
        mode: "openai",
      });
    } catch (e) {
      console.error("AI ERROR:", e);
    }
  }

  // -------------------------------------------
  // ⚡ SMART FALLBACK (Without OpenAI)
  // -------------------------------------------

  const isEnglish = /[a-zA-Z]/.test(msg);

  const emotion = (() => {
    if (msg.includes("sad") || msg.includes("दुःख")) return "sad";
    if (msg.includes("love") || msg.includes("प्रेम")) return "love";
    if (msg.includes("happy") || msg.includes("मस्त")) return "happy";
    return "neutral";
  })();

  let reply;

  if (!isEnglish) {
    // Marathi/Hindi
    const dict = {
      sad: "King Maker, मी आहे ⚡ जे काही झाले ते तू एकटा नाही. शांतपणे सांग, आपण त्यावर जिंकू.",
      love: "प्रेम सुंदर आहे Boss 💖 काय चाललं आहे? मला अधिक सांग.",
      happy: "🔥 तुझा vibe खूपच powerful वाटतोय! पुढचं मोठं पाऊल काय?",
      neutral: `Boss, "${msg}" हे ऐकले. आता पुढे काय योजना?`
    };
    reply = dict[emotion];
  } else {
    // English
    const dict = {
      sad: "Boss, I'm here. You're stronger than you feel. Talk to me.",
      love: "Love is powerful Boss 💛 Tell me more.",
      happy: "Your energy is rising 🌟 What’s next?",
      neutral: `Got it Boss: "${msg}". What's the next move?`
    };
    reply = dict[emotion];
  }

  return Response.json({
    reply,
    emotion,
    mode: "fallback",
  });
}
