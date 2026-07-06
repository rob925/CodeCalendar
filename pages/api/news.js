const { fetchLiveNews } = require("../../lib/live-news");

module.exports = async function handler(req, res) {
  const subject = String(req.query.subject || "");
  if (subject !== "physics" && subject !== "math") {
    res.status(400).json({ error: "Unsupported subject" });
    return;
  }

  try {
    const payload = await fetchLiveNews(subject);
    res.setHeader("Cache-Control", "s-maxage=18000, stale-while-revalidate=86400");
    res.status(200).json(payload);
  } catch (error) {
    res.status(502).json({ error: error.message || "Could not load live news" });
  }
};
