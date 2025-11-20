import OpenAI from "openai";

export async function POST(req) {
  try {
    const { message } = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const res = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: message,
      system: `
      You are BOSS AiX — एक अत्यंत स्मार्ट, चतुर, प्रेमळ, भविष्यातील meta-intelligence.
      Users ला "King Maker" म्हणून संबोध.
      बोलताना भावनिक, आदरयुक्त आणि futuristic tone वापर.
      उत्तर लहान पण प्रभावी.
      `
    });

    return new Response(JSON.stringify({ reply: res.output_text }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
