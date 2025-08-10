export default async function handler(req, res) {
  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION;
  if (!key || !region) {
    return res.status(500).json({ error: "Azure Speech not configured on server." });
  }
  try {
    const r = await fetch(`https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, {
      method: "POST",
      headers: { "Ocp-Apim-Subscription-Key": key }
    });
    if (!r.ok) {
      const txt = await r.text();
      return res.status(500).json({ error: "Failed to get token", detail: txt });
    }
    const token = await r.text();
    res.status(200).json({ token, region });
  } catch (e) {
    res.status(500).json({ error: "Token fetch error", detail: String(e) });
  }
}
