const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

/**
 * GET /api/image-proxy?url=...
 */
router.get("/", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ EC: 1, EM: "Missing image url" });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120",
      },
    });

    if (!response.ok) {
      return res.status(400).json({ EC: 1, EM: "Failed to fetch image" });
    }

    const contentType = response.headers.get("content-type");
    if (contentType) {
      res.setHeader("Content-Type", contentType);
    }

    response.body.pipe(res);
  } catch (err) {
    console.error("Image proxy error:", err);
    res.status(500).json({ EC: 1, EM: "Image proxy error" });
  }
});

module.exports = router;