async function sendToAI() {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input })
  });

  const audioBlob = await res.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  
  const audio = new Audio(audioUrl);
  audio.play();
}
<button onClick={startListening} style={{padding:"10px", fontSize:"20px"}}>
  🎙 बोल
</button>
