function initHcMenu() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (!button || !nav) return;

  function closeDropdowns() {
    nav.querySelectorAll(".main-nav__item").forEach((item) => {
      item.classList.remove("is-open");

      const trigger = item.querySelector(".main-nav__trigger");

      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  function closeMenu() {
    nav.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    closeDropdowns();
  }

  button.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");

    button.setAttribute("aria-expanded", String(open));

    if (!open) {
      closeDropdowns();
    }
  });

  nav.querySelectorAll(".main-nav__trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const parent = trigger.closest(".main-nav__item");

      if (!parent) return;

      const open = !parent.classList.contains("is-open");

      closeDropdowns();

      if (open) {
        parent.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  nav.querySelectorAll(".main-nav__link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !button.contains(e.target)) {
      closeMenu();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHcMenu, {
    once: true,
  });
} else {
  initHcMenu();
}
