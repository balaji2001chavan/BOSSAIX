const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// Serve all files from root directory
app.use(express.static(__dirname));

// Default fallback – load index.html from ROOT
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log("🔥 BossAIX LIVE server running on port", PORT);
});
