(function () {
  "use strict";

  const root = document.querySelector("[data-fanshop]");
  if (!root || root.dataset.fanInitialized) return;
  root.dataset.fanInitialized = "true";

  const overlay = root.querySelector("[data-fan-overlay]");
  const modalBody = root.querySelector("[data-fan-body]");
  const modalTitle = root.querySelector("[data-fan-title]");
  const dialog = root.querySelector(".fan-dialog");
  const search = root.querySelector("[data-fan-search]");
  const orderUrl = root.dataset.orderUrl || "";
  const currency = new Intl.NumberFormat("cs-CZ", {
    style: "currency", currency: "CZK", maximumFractionDigits: 0
  });

  // Product details, variants, prices, and images originate from the server-rendered Twig DOM.
  // The browser never defines or owns the product catalog.
  const catalog = new Map(
    [...root.querySelectorAll("[data-fan-item]")].map((element) => [
      element.dataset.productId, element
    ])
  );

  const key = "hc-fanshop-cart-v2";
  let cart = [];
  let returnFocus = null;
  let customer = null;
  let checkoutValues = null;
  let shippingPrice = 0;

  const money = (value) => currency.format(value);
  const priceOf = (id) => Number(catalog.get(id)?.dataset.price || 0);
  const variantOf = (id, variantId) => {
    const template = [...root.querySelectorAll("[data-fan-detail-template]")]
      .find((item) => item.dataset.fanDetailTemplate === id);
    if (!template) return null;
    const control = [...template.content.querySelectorAll("[name=variantId]")]
      .find((item) => item.value === variantId);
    if (!control) return null;
    const label = control.closest("label");
    return label ? label.textContent.trim() : "";
  };

  const validItem = (item) =>
    item && catalog.has(String(item.id)) &&
    typeof item.variantId === "string" &&
    variantOf(String(item.id), item.variantId) !== null &&
    Number.isInteger(item.qty) && item.qty >= 1 && item.qty <= 99;

  try {
    const stored = JSON.parse(sessionStorage.getItem(key) || "[]");
    if (Array.isArray(stored)) cart = stored.filter(validItem);
  } catch (_error) {
    cart = [];
  }

  function storeCart() {
    try {
      sessionStorage.setItem(key, JSON.stringify(cart));
    } catch (_error) {
      // The demo still works when browser storage is disabled.
    }
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    root.querySelectorAll("[data-fan-count]").forEach((element) => {
      element.textContent = String(count);
    });
  }

  const subtotal = () => cart.reduce(
    (sum, item) => sum + priceOf(item.id) * item.qty, 0
  );

  function templateContent(name) {
    const template = root.querySelector('[data-fan-template="' + name + '"]');
    return template ? template.content.cloneNode(true) : document.createDocumentFragment();
  }

  function show(name, fragment) {
    const labels = {
      product: "Detail produktu",
      cart: "Nákupní košík",
      checkout: "Dokončení objednávky",
      summary: "Shrnutí objednávky"
    };
    if (overlay.hidden) returnFocus = document.activeElement;
    modalTitle.textContent = labels[name] || "Fanshop";
    modalBody.replaceChildren(fragment);
    overlay.hidden = false;
    document.body.classList.add("fan-modal-open");
    dialog.focus();
  }

  function close() {
    overlay.hidden = true;
    document.body.classList.remove("fan-modal-open");
    modalBody.replaceChildren();
    if (returnFocus && returnFocus.isConnected) returnFocus.focus();
  }

  function showProduct(id) {
    const template = [...root.querySelectorAll("[data-fan-detail-template]")]
      .find((element) => element.dataset.fanDetailTemplate === id);
    if (template) show("product", template.content.cloneNode(true));
  }

  function fillText(container, selector, value) {
    container.querySelectorAll(selector).forEach((element) => {
      element.textContent = String(value);
    });
  }

  function lineFor(item, index) {
    const card = catalog.get(item.id);
    const fragment = templateContent("cart-line");
    const row = fragment.querySelector(".fan-line");
    const sourceImage = card.querySelector(".fan-product__image").firstElementChild;
    if (sourceImage) row.querySelector("[data-fan-line-image]").append(sourceImage.cloneNode(true));
    fillText(row, "[data-fan-line-name]", card.querySelector("h2").textContent.trim());
    fillText(row, "[data-fan-line-variant]", variantOf(item.id, item.variantId) || "Standard");
    fillText(row, "[data-fan-line-price]", money(priceOf(item.id)));
    fillText(row, "[data-fan-line-total]", money(priceOf(item.id) * item.qty));
    const qty = row.querySelector("[data-fan-qty]");
    qty.dataset.fanQty = String(index);
    qty.value = String(item.qty);
    row.querySelector("[data-fan-remove]").dataset.fanRemove = String(index);
    return row;
  }

  function showCart() {
    const fragment = templateContent(cart.length ? "cart" : "cart-empty");
    if (cart.length) {
      const lines = fragment.querySelector("[data-fan-lines]");
      cart.forEach((item, index) => lines.append(lineFor(item, index)));
      fillText(fragment, "[data-fan-subtotal]", money(subtotal()));
    }
    show("cart", fragment);
  }

  function shippingCost(form) {
    const selected = form.querySelector('input[name="shipping"]:checked');
    return selected ? Number(selected.dataset.price || 0) : 0;
  }

  function populateSummaryLines(container) {
    container.querySelectorAll("[data-fan-summary-lines]").forEach((list) => {
      list.replaceChildren();
      cart.forEach((item) => {
        const card = catalog.get(item.id);
        const fragment = templateContent("summary-line");
        const row = fragment.querySelector(".fan-summary-line");
        fillText(row, "[data-fan-summary-name]",
          card.querySelector("h2").textContent.trim() +
          " · " + (variantOf(item.id, item.variantId) || "Standard") + " × " + item.qty);
        fillText(row, "[data-fan-summary-price]", money(priceOf(item.id) * item.qty));
        list.append(row);
      });
    });
  }

  function updateTotals(container) {
    fillText(container, "[data-fan-shipping]", money(shippingPrice));
    fillText(container, "[data-fan-total]", money(subtotal() + shippingPrice));
    populateSummaryLines(container);
  }

  function showCheckout() {
    if (!cart.length) {
      showCart();
      return;
    }
    const fragment = templateContent("checkout");
    const form = fragment.querySelector("[data-fan-checkout]");
    if (checkoutValues) {
      for (const [name, value] of Object.entries(checkoutValues)) {
        const input = [...form.elements].find((element) => element.name === name && (
          element.type !== "radio" || element.value === value
        ));
        if (input) {
          if (input.type === "radio") input.checked = true;
          else input.value = value;
        }
      }
    }
    shippingPrice = shippingCost(form);
    updateTotals(fragment);
    show("checkout", fragment);
  }

  function showSummary(form) {
    if (!form.reportValidity()) return;
    const selectedPayment = form.querySelector('input[name="payment"]:checked');
    const selectedShipping = form.querySelector('input[name="shipping"]:checked');
    if (selectedPayment?.dataset.pickupOnly === "true" &&
        selectedShipping?.dataset.isPickup !== "true") {
      const error = form.querySelector("[data-fan-form-error]");
      if (error) {
        error.textContent = "Tento způsob platby je dostupný pouze při osobním odběru.";
        error.hidden = false;
      }
      return;
    }
    const data = new FormData(form);
    customer = Object.fromEntries(data.entries());
    checkoutValues = customer;
    shippingPrice = shippingCost(form);
    const fragment = templateContent("summary");
    fillText(fragment, "[data-fan-customer]", customer.firstName + " " + customer.lastName);
    fillText(fragment, "[data-fan-email]", customer.email);
    fillText(fragment, "[data-fan-phone]", customer.phone);
    fillText(fragment, "[data-fan-address]", customer.street + ", " + customer.zip + " " + customer.city);
    fillText(fragment, "[data-fan-shipping-name]",
      selectedShipping?.closest("label")?.querySelector("strong")?.textContent || "");
    fillText(fragment, "[data-fan-payment-name]",
      selectedPayment?.closest("label")?.querySelector("strong")?.textContent || "");
    fillText(fragment, "[data-fan-summary-message]", orderUrl
      ? "Zkontrolujte údaje a odešlete objednávku."
      : "Ukázková objednávka. Bez nastaveného backendu se nic neodešle.");
    updateTotals(fragment);
    show("summary", fragment);
  }

  function submitOrder() {
    // Explicit integration point: real server must validate product/variant IDs,
    // quantity, inventory, pricing, shipping, CSRF, and customer data.
    // No browser-calculated prices are submitted as authoritative amounts.
    if (!orderUrl || !customer || !cart.length) return;
    const form = document.createElement("form");
    form.method = "POST";
    form.action = orderUrl;
    form.hidden = true;
    for (const [name, value] of Object.entries(customer)) {
      const field = document.createElement("input");
      field.type = "hidden";
      field.name = name;
      field.value = value;
      form.append(field);
    }
    const items = document.createElement("input");
    items.type = "hidden";
    items.name = "items";
    items.value = JSON.stringify(cart.map(({ id, variantId, qty }) => ({
      productId: id, variantId, quantity: qty
    })));
    form.append(items);
    if (root.dataset.csrf) {
      const csrf = document.createElement("input");
      csrf.type = "hidden";
      csrf.name = "_token";
      csrf.value = root.dataset.csrf;
      form.append(csrf);
    }
    document.body.append(form);
    form.submit();
  }

  function applyFilters() {
    const category = root.querySelector("[data-fan-filter].is-active")?.dataset.fanFilter || "";
    const query = search.value.toLocaleLowerCase("cs-CZ").trim();
    let visible = 0;
    catalog.forEach((card) => {
      const title = card.querySelector("h2").textContent.toLocaleLowerCase("cs-CZ");
      const match = (!category || card.dataset.category === category) && title.includes(query);
      card.hidden = !match;
      if (match) visible++;
    });
    root.querySelector("[data-fan-noresults]").hidden = visible !== 0;
  }

  root.addEventListener("click", (event) => {
    const productButton = event.target.closest("[data-fan-product]");
    if (productButton) {
      showProduct(productButton.dataset.fanProduct);
      return;
    }
    const filter = event.target.closest("[data-fan-filter]");
    if (filter) {
      root.querySelectorAll("[data-fan-filter]").forEach((button) =>
        button.classList.toggle("is-active", button === filter)
      );
      applyFilters();
      return;
    }
    if (event.target.closest("[data-fan-close]")) {
      close();
      return;
    }
    const openButton = event.target.closest("[data-fan-open]");
    if (openButton) {
      if (openButton.dataset.fanOpen === "cart") showCart();
      if (openButton.dataset.fanOpen === "checkout") showCheckout();
      return;
    }
    const remove = event.target.closest("[data-fan-remove]");
    if (remove) {
      cart.splice(Number(remove.dataset.fanRemove), 1);
      storeCart();
      showCart();
      return;
    }
    if (event.target.closest("[data-fan-submit-order]")) submitOrder();
  });

  root.addEventListener("change", (event) => {
    if (event.target.matches("[data-fan-qty]")) {
      const index = Number(event.target.dataset.fanQty);
      if (!cart[index]) return;
      cart[index].qty = Math.max(1, Math.min(99, Number(event.target.value) || 1));
      storeCart();
      showCart();
      return;
    }
    if (event.target.name === "shipping") {
      const form = event.target.closest("[data-fan-checkout]");
      shippingPrice = shippingCost(form);
      updateTotals(form);
    }
  });

  root.addEventListener("submit", (event) => {
    if (event.target.matches("[data-fan-add]")) {
      event.preventDefault();
      const form = event.target;
      if (!form.reportValidity()) return;
      const id = form.dataset.productId;
      if (!catalog.has(id)) return;
      const data = new FormData(form);
      const variantId = String(data.get("variantId") || "");
      if (variantOf(id, variantId) === null) return;
      const qty = Math.max(1, Math.min(99, Number(data.get("qty")) || 1));
      const existing = cart.find((item) => item.id === id && item.variantId === variantId);
      if (existing) existing.qty = Math.min(99, existing.qty + qty);
      else cart.push({ id, variantId, qty });
      storeCart();
      showCart();
    } else if (event.target.matches("[data-fan-checkout]")) {
      event.preventDefault();
      showSummary(event.target);
    }
  });

  search?.addEventListener("input", applyFilters);
  document.addEventListener("keydown", (event) => {
    if (overlay.hidden) return;
    if (event.key === "Escape") {
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [...dialog.querySelectorAll(
      "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled])"
    )].filter((element) => element.getClientRects().length);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  storeCart();
})();