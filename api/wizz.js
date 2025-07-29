export default async function handler(req, res) {
  const { question } = req.query;
  const key = process.env.OPENROUTER_API_KEY;

  // 🔐 Use fallback if key is missing
  if (!key) {
    return res.status(200).json({
      answer: `🔧 [MOCK] You said: "${question}". Wizz is thinking...`
    });
  }

  try {
    const result = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
      }),
    });

    const data = await result.json();

    const reply = data?.choices?.[0]?.message?.content || "⚠️ Wizz heard nothing back.";
    res.status(200).json({ answer: reply });
  } catch (error) {
    console.error("Wizz API error:", error);
    res.status(500).json({ answer: "⚠️ Wizz failed to connect to the AI servers." });
  }
}
