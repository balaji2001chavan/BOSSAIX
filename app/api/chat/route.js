export async function POST(req) {
  const body = await req.json();
  const userMessage = body.message || "";

  console.log("Boss AIX User:", userMessage);

  // सध्या टेस्ट reply (नंतर खरा AI लावू)
  const replyText = "Boss AIX Reply: " + userMessage;

  return Response.json({ reply: replyText });
}
