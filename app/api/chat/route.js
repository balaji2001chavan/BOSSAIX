export async function POST(req) {
  const body = await req.json();
  const msg = body.message || "";

  // Language detection
  const isEnglish = /[a-zA-Z]/.test(msg);
  const language = isEnglish ? "en" : "auto";

  // Emotion detection (basic)
  let emotion = "neutral";
  if (msg.includes("sad") || msg.includes("😢")) emotion = "sad";
  if (msg.includes("love") || msg.includes("❤️")) emotion = "love";
  if (msg.includes("😂") || msg.includes("haha")) emotion = "happy";

  // AI reply logic
  let reply;

  switch (emotion) {
    case "sad":
      reply = "मी तुझ्यासोबत आहे 💛 काय झालं?";
      break;

    case "love":
      reply = "प्रेम खूप सुंदर असतं 💖 मला अजून सांग!";
      break;

    case "happy":
      reply = "खूप छान! 😄 पुढे काय करूया?";
      break;

    default:
      reply = `तू म्हणालास: "${msg}" मी ऐकतेय… आणखी सांग 🙂`;
  }

  return Response.json({
    status: "AI_CORE_ACTIVE",
    reply,
    emotion,
    language
  });
}
