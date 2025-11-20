export async function POST(req) {
  try {
    const { text } = await req.json();

    const voiceAPI = "https://api.elevenlabs.io/v1/text-to-speech/<YOUR_VOICE_ID>";
    
    const response = await fetch(voiceAPI, {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: text,
        voice_settings: {
          stability: 0.65,
          similarity_boost: 0.85,
          style: 0.9,
          use_speaker_boost: true
        }
      })
    });

    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      headers: { "Content-Type": "audio/mpeg" }
    });

  } catch (error) {
    return new Response("Error generating voice", { status: 500 });
  }
}
