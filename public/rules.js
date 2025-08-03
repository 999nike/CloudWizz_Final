// File: scripts/rules.js

let overrideMode = false;
let devMasterActive = true; // Future: lockable if needed

function applyOverrideMode() {
  overrideMode = true;
  localStorage.setItem("wizzOverride", "true");
}

function clearOverrideMode() {
  overrideMode = false;
  localStorage.removeItem("wizzOverride");
}

function isOverrideModeActive() {
  return overrideMode;
}

function enforceDevMaster() {
  if (!devMasterActive) {
    alert("🛡 DevMaster control is required to access this feature.");
    throw new Error("DevMaster protection blocked this action.");
  }
}

// On load, restore override state if saved
(function loadOverrideState() {
  const flag = localStorage.getItem("wizzOverride");
  if (flag === "true") {
    overrideMode = true;
  }
})();

// Expose globally
window.applyOverrideMode = applyOverrideMode;
window.clearOverrideMode = clearOverrideMode;
window.isOverrideModeActive = isOverrideModeActive;
window.enforceDevMaster = enforceDevMaster;
