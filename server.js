// ----------------------------------------------
// BOSS AIX — SMART SERVER (Render Compatible)
// ----------------------------------------------

const express = require("express");
const path = require("path");

const app = express();

// Force correct absolute path
const BUILD_DIR = path.join(__dirname, "build");

// Log for debugging
console.log("🚀 Server starting...");
console.log("📁 Serving from:", BUILD_DIR);

// 1) Serve static React build
app.use(express.static(BUILD_DIR));

// 2) Fallback for all routes (React SPA)
app.get("*", (req, res) => {
  const indexPath = path.join(BUILD_DIR, "index.html");

  console.log("➡️  Serving:", indexPath);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("❌ Error serving index.html:", err);
      res.status(500).send("Server Error");
    }
  });
});

// 3) Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🔥 BossAIX server running on port ${PORT}`);
});
