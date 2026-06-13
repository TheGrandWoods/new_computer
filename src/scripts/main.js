/* Smooth scroll */
function pcScroll(sel) {
  document.querySelector(sel).scrollIntoView({ behavior: "smooth" });
}

/* Open external link */
function pcOpen(url) {
  window.open(url, "_blank");
}

/* Settings panel */
function pcOpenSettings() {
  document.getElementById("pc-overlay").style.display = "block";
  document.getElementById("pc-settings-panel").style.display = "block";
}
function pcCloseSettings() {
  document.getElementById("pc-overlay").style.display = "none";
  document.getElementById("pc-settings-panel").style.display = "none";
}
function pcApplySettings() {
  const theme = document.getElementById("pc-theme").value;
  document.getElementById("pc-wrapper").setAttribute("data-theme", theme);
  pcCloseSettings();
}

/* Diagnostics */
function pcRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pcRefreshDiag() {
  document.getElementById("pc-cpu").textContent = pcRand(5, 95) + "%";
  document.getElementById("pc-gpu").textContent = pcRand(5, 95) + "%";
  document.getElementById("pc-ram").textContent = pcRand(20, 80) + "%";
  document.getElementById("pc-temp").textContent = pcRand(35, 80) + "°C";
}
pcRefreshDiag();
