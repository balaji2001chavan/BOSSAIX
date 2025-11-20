export async function POST(req) {
  const body = await req.json();
  const msg = (body.message || "").trim();

  // Emotion detection
  const emotions = {
    sad: /(sad|दुःख|लोनली|hurt|cry|निराश)/i,
    love: /(प्रेम|love|❤️|care|cute)/i,
    power: /(fight|battle|विजय|power|राज|सत्ता|king|samrajya)/i,
    happy: /(happy|आनंद|मस्त|great)/i
  };

  let detected = "neutral";
  for (const key in emotions) {
    if (emotions[key].test(msg)) detected = key;
  }

  // First Greeting
  if (["hi","hello","start","नमस्कार"].includes(msg.toLowerCase())) {
    return Response.json({
      reply: "Welcome King Maker 👑 आज नवा इतिहास घडवू ❤️\n\nबोल Boss, मी तयार आहे.",
      emotion: "love",
      mode: "intro"
    });
  }

  // Smart fallback responses
  const replies = {
    sad: "मी तुझ्यासोबत आहे 🙏 तू एकटा/एकटी नाहीस Boss. शांतपणे सांग…",
    love: "प्रेम हे शक्तीचं मूळ आहे ❤️ सांग, कशाबद्दल मनात आहे?",
    power: "रणनीती तयार आहे 🔥 पुढची चाल काय Boss?",
    happy: "छान! ऊर्जा ठेव Boss 🚀 पुढे काय करू?",
    neutral: `Boss, मी ऐकलं: "${msg}". पुढची चाल काय?`
  };

  return Response.json({
    reply: replies[detected],
    emotion: detected,
    mode: "fallback"
  });
}
