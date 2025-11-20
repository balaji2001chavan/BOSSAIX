export async function POST(req) {
  const body = await req.json();
  const userMessage = body.message || "";

  // STEP 1: Language detect (simple version)
  const isEnglish = /[a-zA-Z]/.test(userMessage);
  const language = isEnglish ? "en" : "auto";

  // STEP 2: Simple emotion detection
  let emotion = "neutral";
  if (userMessage.includes("sad") || userMessage.includes("😭")) emotion = "sad";
  if (userMessage.includes("love") || userMessage.includes("❤️")) emotion = "love";
  if (userMessage.includes("😂") || userMessage.includes("haha")) emotion = "happy";

  // STEP 3: Dynamic reply logic (local + future online AI)
  let reply = "";

  // Basic reasoning mock (replace later with AI)
  switch (emotion) {
    case "sad":
      reply = "मी तुझ्यासोबत आहे 💛 तुला काय झालं?";
      break;
    case "love":
      reply = "प्रेम खूप सुंदर असतं 💖 मला अजून सांग!";
      break;
    case "happy":
      reply = "खूपच मजा आली! 😄 पुढे काय करूया?";
      break;
    default:
      reply = `मी ऐकतेय... तू म्हणालास: "${userMessage}". आणखी सांग 🙂`;
  }

  // STEP 4: Return JSON
  return Response.json({
    reply,
    language,
    emotion,
    status: "AI_CORE_ACTIVE"
  });
}
