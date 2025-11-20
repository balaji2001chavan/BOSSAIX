export async function POST(req) {
  const body = await req.json();
  const msg = (body.message || "").trim();

  if (!msg) {
    return Response.json({
      reply: "काही तरी लिही ना 🙂",
      mode: "fallback",
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  // ---------- 1) सुपर स्मार्ट मोड: OpenAI API असेल तर ----------
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
              content:
                "You are BOSS AIX, a multilingual, emotional, very smart assistant. " +
                "You understand Marathi, Hindi, English and many other languages. " +
                "Reply in the same language as the user. Be friendly, kind and practical. " +
                "User is building a universal AI app, so try to be helpful, creative and clear.",
            },
            {
              role: "user",
              content: msg,
            },
          ],
        }),
      });

      const data = await res.json();

      const aiText =
        data?.choices?.[0]?.message?.content?.trim() ||
        "माफ करा, मला उत्तर कळलं नाही.";

      return Response.json({
        reply: aiText,
        mode: "openai",
      });
    } catch (e) {
      console.error("OpenAI error:", e);
      // खाली fallback ला जाऊ दे
    }
  }

  // ---------- 2) फॉलबॅक मोड: साधा पण थोडा स्मार्ट उत्तर ----------
  const isEnglish = /[a-zA-Z]/.test(msg);

  let emotion = "neutral";
  if (msg.includes("sad") || msg.includes("दुख") || msg.includes("प्रॉब्लेम")) emotion = "sad";
  if (msg.includes("love") || msg.includes("❤️") || msg.includes("प्रेम")) emotion = "love";
  if (msg.includes("😂") || msg.includes("मस्त") || msg.includes("happy")) emotion = "happy";

  let reply;

  if (!isEnglish) {
    // मराठी / हिंदी सारख्या भाषांसाठी
    switch (emotion) {
      case "sad":
        reply =
          "अरे, मला वाटतं तू थोडा खिन्न आहेस 💛 काय झालं ते शांतपणे सांग, मी तुझ्यासोबत आहे.";
        break;
      case "love":
        reply =
          "व्वा! प्रेमाच्या गोष्टी नेहमीच खास असतात 💖 थोडं अधिक सांग, काय चाललं आहे?";
        break;
      case "happy":
        reply =
          "मस्त! 😄 तुझा mood खूप positive वाटतोय. पुढे काय प्लॅन आहे?";
        break;
      default:
        reply = `मी समजून घेण्याचा प्रयत्न करतेय 🙂 तू म्हणालास: "${msg}". मला अजून detail मध्ये सांगशील का?`;
    }
  } else {
    // इंग्लिश सारख्या मेसेजसाठी
    switch (emotion) {
      case "sad":
        reply =
          "It sounds like you're feeling low 💛 I'm here with you. Tell me what's going on?";
        break;
      case "love":
        reply =
          "Love is beautiful 💖 Tell me more, what's happening in your life?";
        break;
      case "happy":
        reply =
          "Nice! 😄 Your energy feels great. What shall we do next?";
        break;
      default:
        reply = `I hear you: "${msg}". Tell me a bit more so I can help better 🙂`;
    }
  }

  return Response.json({
    reply,
    mode: "fallback",
    emotion,
  });
}
