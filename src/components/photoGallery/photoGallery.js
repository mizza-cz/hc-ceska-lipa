function initPhotoGallery() {
  const root = document.querySelector(".photo-gallery");
  if (!root) return;

  const items = Array.from(root.querySelectorAll("[data-gallery-item]"));
  const lightbox = root.querySelector("[data-gallery-lightbox]");
  const image = root.querySelector("[data-gallery-image]");
  const caption = root.querySelector("[data-gallery-caption]");
  const counter = root.querySelector("[data-gallery-counter]");
  const closeButton = root.querySelector("[data-gallery-close]");
  const prevButton = root.querySelector("[data-gallery-prev]");
  const nextButton = root.querySelector("[data-gallery-next]");
  if (!items.length || !lightbox || !image || !closeButton) return;

  let current = 0;
  let previousFocus = null;
  let originalOverflow = "";

  function show(index) {
    current = (index + items.length) % items.length;
    const item = items[current];
    image.src = item.getAttribute("data-full").replace(/&amp;/g, "&");
    image.alt = item.dataset.alt || "";
    caption.textContent = image.alt;
    counter.textContent = (current + 1) + " / " + items.length;
  }

  function close() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = originalOverflow;
    document.removeEventListener("keydown", onKeydown);
    image.removeAttribute("src");
    if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
  }

  function onKeydown(event) {
    if (event.key === "Escape") close();
    else if (event.key === "ArrowLeft") show(current - 1);
    else if (event.key === "ArrowRight") show(current + 1);
    else if (event.key === "Tab") {
      const controls = [closeButton, prevButton, nextButton].filter(Boolean);
      const focusIndex = controls.indexOf(document.activeElement);
      if (event.shiftKey && (focusIndex === 0 || focusIndex === -1)) {
        event.preventDefault();
        controls[controls.length - 1].focus();
      } else if (!event.shiftKey && focusIndex === controls.length - 1) {
        event.preventDefault();
        controls[0].focus();
      }
    }
  }

  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      previousFocus = document.activeElement;
      originalOverflow = document.body.style.overflow;
      show(index);
      lightbox.hidden = false;
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      closeButton.focus();
      document.addEventListener("keydown", onKeydown);
    });
  });

  closeButton.addEventListener("click", close);
  if (prevButton) prevButton.addEventListener("click", () => show(current - 1));
  if (nextButton) nextButton.addEventListener("click", () => show(current + 1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPhotoGallery, { once: true });
} else {
  initPhotoGallery();
}
