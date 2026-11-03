function initYouthBoard() {
  const root = document.querySelector("[data-youth-board]");
  if (!root) return;

  const categoryButtons = root.querySelectorAll(".hc-youth-board__categories [data-category]");
  const categoryPanels = root.querySelectorAll("[data-youth-category-panel]");

  function activate(buttons, selected) {
    buttons.forEach((button) => {
      const active = button === selected;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
  }

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activate(categoryButtons, button);

      categoryPanels.forEach((panel) => {
        panel.hidden = panel.dataset.youthCategoryPanel !== button.dataset.category;
      });
    });
  });

  categoryPanels.forEach((categoryPanel) => {
    const tabs = categoryPanel.querySelectorAll(".hc-youth-board__tabs [data-youth-tab]");
    const panels = categoryPanel.querySelectorAll("[data-youth-panel]");

    tabs.forEach((button) => {
      button.addEventListener("click", () => {
        activate(tabs, button);

        panels.forEach((panel) => {
          panel.hidden = panel.dataset.youthPanel !== button.dataset.youthTab;
        });
      });
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initYouthBoard, { once: true });
} else {
  initYouthBoard();
}
