// File: scripts/memory.js

let memoryStore = {
  name: "",
  traits: [],
  reminders: [],
};

function saveMemory() {
  try {
    localStorage.setItem("cloudWizzMemory", JSON.stringify(memoryStore));
  } catch (err) {
    console.warn("⚠️ Could not save memory:", err);
  }
}

function loadMemory() {
  try {
    const raw = localStorage.getItem("cloudWizzMemory");
    if (raw) {
      const data = JSON.parse(raw);
      memoryStore = {
        name: data.name || "",
        traits: data.traits || [],
        reminders: data.reminders || [],
      };
    }
  } catch (err) {
    console.warn("⚠️ Could not load memory:", err);
  }
}

function rememberName(newName) {
  memoryStore.name = newName;
  saveMemory();
  return `👋 Nice to meet you, ${newName}.`;
}

function addTrait(trait) {
  if (!memoryStore.traits.includes(trait)) {
    memoryStore.traits.push(trait);
    saveMemory();
  }
}

function addReminder(note) {
  memoryStore.reminders.push(note);
  saveMemory();
}

function getMemorySummary() {
  const name = memoryStore.name ? `Your name is ${memoryStore.name}.` : "";
  const traits = memoryStore.traits.length
    ? `Traits: ${memoryStore.traits.join(", ")}.`
    : "";
  const reminders = memoryStore.reminders.length
    ? `Reminders: ${memoryStore.reminders.join(" | ")}.`
    : "";
  return [name, traits, reminders].filter(Boolean).join(" ");
}

// Expose globally
window.saveMemory = saveMemory;
window.loadMemory = loadMemory;
window.getMemorySummary = getMemorySummary;
window.rememberName = rememberName;
window.addTrait = addTrait;
window.addReminder = addReminder;
