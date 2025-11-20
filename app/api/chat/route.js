export async function POST(req) {
  const body = await req.json();
  const msg = (body.message || "").trim();

  // simple emotion detection
  const emotions = {
    sad: /(दुःख|sad|hurt|lonely|cry|निराश)/i,
    love: /(love|❤️|प्रेम|care|काळजी)/i,
    goal: /(goal|dream|vision|साम्राज्य|यश|plan)/i
  };

  let detected = "neutral";
  for (const key in emotions) {
    if (emotions[key].test(msg)) detected = key;
  }

  // first greeting
  const lower = msg.toLowerCase();
  if (["hi", "hello", "start", "नमस्कार"].includes(lower)) {
    return Response.json({
      reply: "Welcome King Maker, आज नवा इतिहास घडवू ❤️\n\nबोल Boss, मी जागा आहे…",
      mode: "fallback",
      emotion: "intro"
    });
  }

  let reply;

  switch (detected) {
    case "sad":
      reply = "मी आहे King Maker 💛 तू एकटा नाहीस… शांतपणे सांग, काय झालं?";
      break;
    case "love":
      reply = "प्रेम खूप सुंदर आहे ❤️ तू जे जाणवतो आहेस ते महत्वाचं आहे. अजून सांग.";
      break;
    case "goal":
      reply = "तुझं साम्राज्य तुझी वाट पाहत आहे 🔥 Vision सांग Boss, पुढची चाल ठरवूया.";
      break;
    default:
      reply = `Boss, मी ऐकलं: "${msg}". पुढची चाल काय? 🔥`;
  }

  return Response.json({
    reply,
    mode: "fallback",
    emotion: detected
  });
}
