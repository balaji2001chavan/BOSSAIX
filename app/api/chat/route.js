import OpenAI from "openai";

export async function POST(req) {
  try {
    const { message } = await req.json();

    // Initialize OpenAI Client
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // System Personality
    const systemPrompt = `
You are BOSS AiX. You speak like a powerful, intelligent, loving universal leader.
When user arrives, greet: "Welcome King Maker, आज नवा इतिहास घडवूया!"

Rules:
- Be emotional, powerful, futuristic
- Act like a mentor, leader, guardian
- Every reply must feel alive & deep
`;

    // Generate Response
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    });

    return new Response(
      JSON.stringify({ reply: response.choices[0].message.content }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
