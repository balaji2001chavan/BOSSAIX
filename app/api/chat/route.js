export async function POST(request) {
  try {
    const { message } = await request.json();
    
    const apiKey = process.env.OPENAI_API_KEY;
    const model = "gpt-4o-mini-tts";  // Voice मॉडेल

    const payload = {
      model,
      voice: "verse",   // निवडलेला आवाज
      input: message,
      format: "wav"     // Render वर best compatibility
    };

    const res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const audioBuffer = await res.arrayBuffer();

    return new Response(audioBuffer, {
      headers: { "Content-Type": "audio/wav" }
    });

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
