function initHcHomepage() {
  const root = document.querySelector(".hc-hero");

  if (root) {
    const slides = Array.from(root.querySelectorAll(".hc-hero__slide"));
    const dots = Array.from(
      root.querySelectorAll(".hc-hero__pagination button")
    );
    const prev = root.querySelector(".hc-hero__prev");
    const next = root.querySelector(".hc-hero__next");

    let active = 0;
    let timer = null;

    if (slides.length > 0) {
      function show(index) {
        active = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
          const isActive = i === active;

          slide.classList.toggle("is-active", isActive);
          slide.setAttribute("aria-hidden", String(!isActive));
        });

        dots.forEach((dot, i) => {
          const isActive = i === active;

          dot.classList.toggle("is-active", isActive);
          dot.setAttribute("aria-current", String(isActive));
        });
      }

      function stop() {
        clearInterval(timer);
        timer = null;
      }

      function start() {
        if (slides.length <= 1) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          return;
        }

        stop();

        timer = setInterval(() => {
          show(active + 1);
        }, 5500);
      }

      show(0);

      if (slides.length > 1) {
        if (prev) {
          prev.addEventListener("click", () => {
            show(active - 1);
          });
        }

        if (next) {
          next.addEventListener("click", () => {
            show(active + 1);
          });
        }

        dots.forEach((dot, i) => {
          dot.addEventListener("click", () => {
            show(i);
          });
        });

        start();

        root.addEventListener("mouseenter", stop);
        root.addEventListener("mouseleave", start);

        document.addEventListener("visibilitychange", () => {
          if (document.hidden) {
            stop();
          } else {
            start();
          }
        });
      }
    }
  }

  const board = document.querySelector(".hc-youth__board");

  if (board) {
    let cat = "U20";
    let type = "Zápasy";

    function update() {
      board.querySelector(".hc-youth__selected").textContent = (
        cat +
        " · " +
        type
      ).toUpperCase();

      board.querySelector(".hc-youth__data").innerHTML = `
        <div class="hc-youth__row">
          <span>Kategorie</span>
          <strong>${cat}</strong>
        </div>
        <div class="hc-youth__row">
          <span>Oddíl</span>
          <strong>HC Česká Lípa</strong>
        </div>
        <div class="hc-youth__row">
          <span>${type}</span>
          <a href="https://www.hcceskalipa.cz/" target="_blank" rel="noopener">
            Aktuální ${type.toLowerCase()} na webu klubu ↗
          </a>
        </div>
      `;
    }

    board.querySelectorAll("[role=tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const group = btn.closest("[role=tablist]");

        group.querySelectorAll("[role=tab]").forEach((b) => {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });

        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");

        if (btn.dataset.category) {
          cat = btn.dataset.category;
        } else {
          type = btn.dataset.type;
        }

        update();
      });
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHcHomepage, {
    once: true,
  });
} else {
  initHcHomepage();
}
