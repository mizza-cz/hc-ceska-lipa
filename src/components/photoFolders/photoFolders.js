function initPhotoFolders() {
  const root = document.querySelector(".photo-folders");
  if (!root) return;
  const month = root.querySelector("#folder-month");
  const category = root.querySelector("#folder-category");
  const search = root.querySelector("#folder-search");
  const cards = Array.from(root.querySelectorAll("[data-folder]"));
  const empty = root.querySelector("[data-folder-empty]");
  const form = root.querySelector("[data-folder-filters]");
  if (!month || !category || !search || !empty) return;
  function filter() {
    const query = search.value.trim().toLocaleLowerCase("cs-CZ");
    let shown = 0;
    cards.forEach((card) => {
      const visible =
        (month.value === "all" || card.dataset.month === month.value) &&
        (category.value === "all" || card.dataset.category === category.value) &&
        (card.dataset.name || "").toLocaleLowerCase("cs-CZ").includes(query);
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    empty.hidden = shown > 0;
  }
  if (form) form.addEventListener("submit", (event) => event.preventDefault());
  month.addEventListener("change", filter);
  category.addEventListener("change", filter);
  search.addEventListener("input", filter);
  filter();
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPhotoFolders, { once: true });
} else {
  initPhotoFolders();
}
