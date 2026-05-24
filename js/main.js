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

let menuOpen = false;

function openMenu() {
  menuOpen = true;
  drawer.classList.add("open");
  overlay.classList.add("visible");
  btn.classList.remove("icon-open");
  btn.classList.add("menu-open");
  btn.setAttribute("aria-expanded", "true");
  btn.setAttribute("aria-label", "Close menu");
}

function closeMenu() {
  menuOpen = false;
  drawer.classList.remove("open");
  overlay.classList.remove("visible");
  btn.classList.remove("menu-open");
  btn.classList.add("icon-open");
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-label", "Open menu");
}

btn.addEventListener("click", () => {
  menuOpen ? closeMenu() : openMenu();
});

document.addEventListener("click", (e) => {
  if (menuOpen && !btn.contains(e.target) && !e.target.closest("a")) {
    closeMenu();
  }
});

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    btn.classList.add("icon-open");
  });
});
