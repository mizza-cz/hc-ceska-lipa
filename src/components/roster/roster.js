function initHcRoster() {
  const root = document.querySelector(".roster-page");
  if (!root) return;
  const season = root.querySelector("#roster-season"),
    position = root.querySelector("#roster-position"),
    search = root.querySelector("#roster-search"),
    groups = Array.from(root.querySelectorAll("[data-roster-group]")),
    empty = root.querySelector("#roster-empty"),
    note = root.querySelector("#roster-demo-note");
  if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2) {
    window
      .jQuery(root)
      .find(".js-roster-select")
      .select2({
        minimumResultsForSearch: Infinity,
        width: "100%",
        dropdownAutoWidth: false,
      });
  }
  function filter() {
    const phrase = search.value.trim().toLocaleLowerCase("cs-CZ");
    let visible = 0;
    groups.forEach((group) => {
      const allowed =
        position.value === "all" ||
        group.dataset.rosterGroup === position.value;
      let count = 0;
      group.querySelectorAll("tbody tr").forEach((row) => {
        const show =
          allowed &&
          (row.dataset.playerName.includes(phrase) ||
            row.dataset.number.includes(phrase));
        row.hidden = !show;
        if (show) count++;
      });
      group.hidden = !allowed || count === 0;
      group.querySelector(".roster-group__count").textContent =
        count + " hráči";
      visible += count;
    });
    empty.hidden = visible > 0;
    note.textContent =
      season.value === "2026"
        ? "Ukázková soupiska pro návrh designu. Jména a statistické údaje jsou ilustrační."
        : "Archivní sezóna " +
          season.options[season.selectedIndex].text +
          " je pouze ukázka filtru. Zobrazená data jsou demonstrační.";
  }
  search.addEventListener("input", filter);
  position.addEventListener("change", filter);
  season.addEventListener("change", filter);
  filter();
}
if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", initHcRoster, { once: true });
else initHcRoster();
