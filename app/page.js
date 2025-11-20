async function sendToAI() {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input })
  });
<button onClick={startListening} style={{padding:"10px", fontSize:"20px"}}>
  🎙 बोल
</button>
  const audioBlob = await res.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  
  const audio = new Audio(audioUrl);
  audio.play();
}

