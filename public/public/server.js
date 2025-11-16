const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Public folder serve
app.use(express.static(path.join(__dirname, "public")));

// Fallback -> React index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`BossAIX Server Running on port ${PORT}`);
});
