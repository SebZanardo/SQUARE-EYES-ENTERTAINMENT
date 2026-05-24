document.querySelectorAll("code[data-src]").forEach((el) => {
  fetch(el.dataset.src)
    .then((r) => r.text())
    .then((code) => {
      el.textContent = code;
    });
});

const btn = document.getElementById("burger-btn");
const drawer = document.getElementById("nav-drawer");
const overlay = document.getElementById("nav-overlay");

function openMenu() {
  drawer.classList.add("open");
  overlay.classList.add("visible");
  btn.classList.add("open");
  btn.setAttribute("aria-expanded", "true");
  btn.setAttribute("aria-label", "Close menu");
}

function closeMenu() {
  drawer.classList.remove("open");
  overlay.classList.remove("visible");
  btn.classList.remove("open");
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-label", "Open menu");
}

btn.addEventListener("click", () => {
  drawer.classList.contains("open") ? closeMenu() : openMenu();
});

document.addEventListener("click", (e) => {
  if (
    drawer.classList.contains("open") &&
    !btn.contains(e.target) &&
    !e.target.closest("a")
  ) {
    closeMenu();
  }
});
