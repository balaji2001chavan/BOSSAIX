export async function POST(req) {
  const body = await req.json();
  const userMessage = body.message || "";

  // Basic emotion logic
  let emotion = "neutral";
  if (userMessage.includes("sad")) emotion = "sad";
  if (userMessage.includes("love")) emotion = "love";
  if (userMessage.includes("😂") || userMessage.includes("haha")) emotion = "happy";

  let reply;
  switch (emotion) {
    case "sad":
      reply = "तू ठीक आहेस ना? मी तुझ्यासोबत आहे 💛";
      break;
    case "love":
      reply = "प्रेम खूप छान भावना आहे 💖";
      break;
    case "happy":
      reply = "छान! मला पण आनंद झाला 😄";
      break;
    default:
      reply = `मी ऐकत आहे... तू म्हणालास: "${userMessage}" आणखी सांग 🙂`;
  }

  return Response.json({
    reply,
    emotion,
    status: "AI_CORE_ACTIVE"
  });
}
