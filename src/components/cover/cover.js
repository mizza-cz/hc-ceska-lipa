function initHcCover() {
  const popup = document.getElementById("hc-cover");
  if (!popup) return;

  const cookieName = "hc_cover_closed";
  const popupWasClosed = document.cookie
    .split(";")
    .some((cookie) => cookie.trim().startsWith(cookieName + "="));

  if (popupWasClosed) return;

  const button = popup.querySelector(".hc-cover__close");
  const link = popup.querySelector(".hc-cover__link");
  const previousFocus = document.activeElement;

  function closeCover() {
    popup.classList.remove("is-visible");

    const expires = new Date();
    expires.setMonth(expires.getMonth() + 1);
    document.cookie =
      cookieName + "=1; expires=" + expires.toUTCString() +
      "; path=/; SameSite=Lax";

    document.removeEventListener("keydown", handleKeydown);
    if (previousFocus && typeof previousFocus.focus === "function") {
      previousFocus.focus();
    }
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      closeCover();
    }

    if (event.key === "Tab") {
      const focusable = [link, button].filter(Boolean);
      if (!focusable.length) return;
      const active = focusable.indexOf(document.activeElement);
      if (event.shiftKey && (active === 0 || active === -1)) {
        event.preventDefault();
        focusable[focusable.length - 1].focus();
      } else if (!event.shiftKey && active === focusable.length - 1) {
        event.preventDefault();
        focusable[0].focus();
      }
    }
  }

  popup.classList.add("is-visible");
  button.focus();

  button.addEventListener("click", closeCover);
  if (link) link.addEventListener("click", closeCover);
  popup.addEventListener("click", (event) => {
    if (event.target === popup) closeCover();
  });
  document.addEventListener("keydown", handleKeydown);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHcCover, { once: true });
} else {
  initHcCover();
}
