 // 🔁 TEMP FALLBACK — display mock reply immediately for testing
  appendMessage("Wizz", `🧪 You said: "${msg}"`);
  return;

  const response = checkTriggers(msg);
  if (response) {
    appendMessage("Wizz", response);
    return;
  }

  const typing = document.getElementById("typingIndicator");
  typing.classList.add("active");

  const memory = (typeof getMemorySummary === "function") ? getMemorySummary() : "";
  const prompt = memory + "\n\n" + msg;

  try {
    const res = await fetch(`/api/wizz?question=${encodeURIComponent(prompt)}`);
    const data = await res.json();
    appendMessage("Wizz", data.answer || "⚠️ No reply");
  } catch (err) {
    console.warn("❌ API error:", err);
    appendMessage("Wizz", `🔧 [MOCK] You said: "${msg}". Wizz is thinking...`);
  }

  typing.classList.remove("active");
}

function checkTriggers(msg) {
  const lower = msg.toLowerCase();

  if (lower === "who am i") {
    return getMemorySummary() || "🧠 I don't know you yet.";
  }

  if (lower.startsWith("my name is ")) {
    return rememberName(msg.split("is ")[1].trim());
  }

  if (lower.startsWith("add trait ")) {
    addTrait(msg.split("add trait ")[1].trim());
    return "🧠 Trait added.";
  }

  if (lower.startsWith("add reminder ")) {
    addReminder(msg.split("add reminder ")[1].trim());
    return "📌 Reminder noted.";
  }

  if (lower === "override mode on") {
    applyOverrideMode();
    return "🛡 Override mode enabled.";
  }

  return null;
}

function clearChat() {
  localStorage.removeItem("wizzChat");
  location.reload();
}

function loadHistory() {
  const raw = localStorage.getItem("wizzChat");
  if (!raw) return;
  const history = JSON.parse(raw);
  for (const [sender, text] of history) {
    appendMessage(sender, text);
  }
}

// 🧠 Debug: confirm script loaded
console.log("✅ wizzCore.js loaded");

// Expose to global
window.askWizz = askWizz;
window.clearChat = clearChat;
window.loadHistory = loadHistory;
