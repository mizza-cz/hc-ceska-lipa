function initHcMenu() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (!button || !nav) return;

  // Закрытие третьего уровня
  function closeSubmenus() {
    nav.querySelectorAll(".main-nav__subitem").forEach((item) => {
      item.classList.remove("is-open");

      const trigger = item.querySelector(".main-nav__subtrigger");

      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Закрытие второго и третьего уровней
  function closeDropdowns() {
    closeSubmenus();

    nav.querySelectorAll(".main-nav__item").forEach((item) => {
      item.classList.remove("is-open");

      const trigger = item.querySelector(".main-nav__trigger");

      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Закрытие мобильного меню
  function closeMenu() {
    nav.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");

    closeDropdowns();
  }

  // Мобильное меню
  button.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");

    button.setAttribute("aria-expanded", String(open));

    if (!open) {
      closeDropdowns();
    }
  });

  // Второй уровень меню
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

  // Третий уровень меню
  nav.querySelectorAll(".main-nav__subtrigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const parent = trigger.closest(".main-nav__subitem");

      if (!parent) return;

      const open = !parent.classList.contains("is-open");

      // Закрываем только третий уровень,
      // основной dropdown остаётся открытым
      closeSubmenus();

      if (open) {
        parent.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Обычные ссылки первого и второго уровней
  nav
    .querySelectorAll(".main-nav__link, .main-nav__dropdown > a")
    .forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

  // Ссылки третьего уровня
  nav.querySelectorAll(".main-nav__submenu a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Клик вне меню
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !button.contains(e.target)) {
      closeMenu();
    }
  });

  // Закрытие по Escape
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    const wasOpen =
      nav.classList.contains("is-open") || !!nav.querySelector(".is-open");

    if (!wasOpen) return;

    closeMenu();
    button.focus();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHcMenu, {
    once: true,
  });
} else {
  initHcMenu();
}
