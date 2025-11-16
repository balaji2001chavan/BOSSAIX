const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Public folder serve करा
app.use(express.static(path.join(__dirname, "public")));

// React index.html fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`BossAIX Server Running on port ${PORT}`);
});
