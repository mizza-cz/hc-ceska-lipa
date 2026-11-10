# Fanshop: napojení na databázi

Tento adresář je frontendová šablona. Produkty, kategorie, varianty, ceny, obrázky, doprava a platby jsou předávány do Twig jako proměnná `fanshop` z backendu, nikoliv definovány v JavaScriptu.

## Datový kontrakt

Backend předá `fanshop` obsahující:
- `products`: array objektů s `id`, `name`, `categoryId`, `category`, `price` (CZK), `description`, `image` (URL nebo prázdná hodnota), `type` (volitelný motiv zástupného obrázku), `variants` (array `{id, name}`).
- `categories`: array `{id, name}`.
- `shippingOptions`: array `{id, name, price, isPickup}`.
- `paymentOptions`: array `{id, name, description, pickupOnly}`.
- `orderAction`: adresa existující backend POST routy; pokud chybí, nelze odeslat objednávku.
- `csrfToken`: token poskytovaný backendem pro ochranu POST.
- `isDemo`: true jen pro lokální ukázku.

Twig šablony: `fanshop.twig` renderuje katalog, detail produktu, košík, formulář, shrnutí a popupy. `fanshop.js` řeší pouze uživatelské interakce a sestavuje položky košíku podle HTML v DOM.

## Backend POST kontrakt

Při potvrzení se provede běžný POST na `orderAction` s poli `firstName`, `lastName`, `email`, `phone`, `street`, `city`, `zip`, `shipping`, `payment`, `note`, `_token` (pokud je vyplněn) a `items` (JSON).

Například `items` obsahuje pole objektů `[{"productId":"123","variantId":"123-M","quantity":2}]`.

**Backend musí z databáze znovu načíst produkty, ověřit varianty, ceny, sklad, dostupnost, dopravu, platbu a CSRF a teprve potom uložit objednávku. Nikdy nesmí důvěřovat ceně nebo součtu vypočtenému v prohlížeči.** Po zpracování musí backend zobrazit výsledek nebo přesměrovat na stránku potvrzení.

Košík je nyní frontendový (`sessionStorage`). Pokud produkce potřebuje serverový košík, rezervaci skladu nebo synchronizaci mezi zařízeními, musí tyto funkce obsluhovat backend.

## Demonstrace

Data v `fanshop.json` jsou pouze pro statický Gulp build. Produkční Twig musí místo nich dostávat živá data databáze. HTML v `dist/15.0_fanshop.html` je pouze statický náhled a samo o sobě data z DB nenačítá.