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
let recognition;

if (typeof window !== "undefined") {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = "mr-IN";     // भाषा
  recognition.continuous = false; // एक वाक्य ऐकेल
  recognition.interimResults = false;
}

function startListening() {
  recognition.start();
}

recognition.onresult = (event) => {
  const spokenText = event.results[0][0].transcript;
  setInput(spokenText);      // UI मध्ये text दिसेल
  sendToAI(spokenText);      // Voice → AI ला पाठवेल
};
