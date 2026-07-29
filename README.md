# Eliza Makray — website

Static site (semantic HTML5 + vanilla CSS/JS, no build step, no framework). Open `index.html` directly in a browser or upload the whole folder to any static host.

## Structure

```
index.html        Homepage — hero, living works index, manifesto teaser, project teasers,
                   condensed exhibition timeline, workshops teaser, calendar transition, footer
obras.html         Full Tintas Naturais + Fotografias (Terra Fértil) + Audiovisual collections
projetos.html      4 chapters: Musas em Retratos, Ervas Daninhas, Alma Botânica, Ciranda das Ervas
oficinas.html      Aquarelas Naturais, Tintas de Terra, Artista Multidisciplinar, Residência
sobre.html         Full manifesto, materials lexicon, complete exhibition/curriculum history
calendario.html    Calendário Musas sales landing page
obrigado.html      Post-purchase thank-you page (Mercado Pago redirect target)
styles.css         Full design system (palette, type scale, components) — shared by all pages
script.js          Nav, scroll reveal, lightbox, accordions, sticky buy bar, tracking layer
assets/            All imagery, organized by section (see below)
```

## Placeholders to replace before launch

Search the codebase for anything in `[BRACKETS]` — every one is a real gap, not a typo.

### Commerce (calendario.html, obrigado.html)
| Placeholder | Where | What to do |
|---|---|---|
| `[MERCADO_PAGO_CHECKOUT_URL]` | calendario.html (3×) | Replace with the real Mercado Pago checkout link once the product is created. The site never processes payment itself — it only links out. |
| `[PREÇO]`, `[ANO]`, `[FORMATO]`, `[DIMENSÕES]`, `[NÚMERO_DE_PÁGINAS]`, `[TIPO_DE_PAPEL]`, `[REGIÕES_DE_ENVIO]`, `[PRAZO]`, `[TIRAGEM]`, `[SUPORTE_PARA_PENDURAR]` | calendario.html | Fill in confirmed product specs. Do not guess — these were deliberately left blank because the source material didn't confirm them. |
| `[NÚMERO_DO_PEDIDO_MERCADO_PAGO]` | obrigado.html | If you pass an order number via URL param on the Mercado Pago redirect, wire it up in script.js; otherwise remove this line. |

### Calendar product photography
calendario.html has **8 dashed placeholder boxes** (`.media-placeholder`) marked `[FOTO_CAPA]`, `[FOTO_MIOLO_ABERTO]`, `[FOTO_DETALHE_ILUSTRACAO]`, `[FOTO_ENCADERNACAO]`, `[FOTO_PAPEL]`, `[FOTO_PENDURADO]`, `[FOTO_EMBALAGEM]`, `[FOTO_OUTROS_MESES]`, plus one in the "matéria → calendário" sequence. **No photos of the physical printed calendar were in the supplied source material** — only the flat artwork (paintings/watercolors) that will presumably appear inside it. Replace each placeholder `<div class="media-placeholder">` with a real `<img>` once product photography exists. Do not fill these with stock photography.

### Contact & tracking
| Placeholder | Where | What to do |
|---|---|---|
| `[EMAIL_DA_ARTISTA]` | index.html, oficinas.html, calendario.html, obrigado.html | Eliza's real contact email. |
| `[NUMERO_WHATSAPP]` | index.html, calendario.html, obrigado.html | WhatsApp number in international format, digits only (e.g. `5548999999999`), used in `https://wa.me/` links. |
| `[GOOGLE_APPS_SCRIPT_ENDPOINT]` | script.js, top of file | URL of a deployed Google Apps Script Web App that appends rows to a Google Sheet. If left as-is, tracking calls are silently skipped — the site never errors because of this. |
| `[CANONICAL_URL]` | every page's `<link rel="canonical">` and JSON-LD | The live domain once connected (e.g. `https://elizamakray.osite.dev` or the final custom domain). |
| `[SOCIAL_SHARE_IMAGE_URL]` | every page's Open Graph tags | A 1200×630 image for link previews (Instagram/WhatsApp/Facebook). Suggest using one of the Terra Fértil photographs or a Musa watercolor. |

### External links (projetos.html)
| Placeholder | What to do |
|---|---|
| `[CANVA_APRESENTACAO_MUSAS_URL]` | Link to Eliza's existing Canva presentation for Musas em Retratos participation & pricing (she referenced this in her content doc). |
| `[LOJA_ALMA_BOTANICA_URL]` | Link to the Alma Botânica online store. |

Ciranda das Ervas already links to the real official site (`cirandadaservas.com`) — no placeholder needed there.

## Tracking events

`script.js` defines a single `track(eventName, data)` function that POSTs (no-cors, fire-and-forget) to `GOOGLE_APPS_SCRIPT_ENDPOINT`. It never throws — if the endpoint is empty, every call is a silent no-op, so the site works identically with or without analytics configured.

Events already wired up via `data-track="..."` attributes: `page_view` (automatic, every page), `project_view` (Living Works Index + project teaser clicks), `calendar_page_view` (automatic on calendario.html), `calendar_checkout_click` (every "Quero meu calendário" button), `contact_click`, `whatsapp_click`, `purchase_thank_you_view` (automatic on obrigado.html).

To add a new tracked element anywhere, just add `data-track="event_name"` (and optionally `data-label="..."`) to any link or button.

## Images

100 real photographs/artworks were extracted from the supplied Google Drive folder and content PDFs, converted (HEIC/TIFF → JPEG) and resized for web via macOS `sips`. Organized under `assets/`:

- `obras/` — 5 large mixed-media paintings + 16 Musa watercolors (titles, materials and dimensions pulled directly from "Infos sobre as obras.pdf")
- `fotografias/` — 30 images from the Terra Fértil exhibition (credits pulled from "Etiquetas Fotografias expo Terra Fértil.pdf")
- `audiovisual/` — stills for the 8 credited audiovisual pieces (from "infos Audio Visual.pdf")
- `musas-retratos/`, `ervas-daninhas/`, `alma-botanica/`, `oficinas/`, `portraits/` — from the corresponding Drive folders

**Curatorial note:** the "Sobre" source folder contained mostly fine-art body/performance photography (Três Graças, Butô studies), some including full nudity. Prominent public placements (homepage hero, About portrait) deliberately use non-explicit crops (fabric, silhouette, close-up abstraction); more explicit performance photography was kept only within the contextualized Fotografias/Musas galleries where it documents actual gallery-exhibited work. If Eliza wants bolder placements, swap the relevant `<img src>` in `index.html` / `sobre.html`.

**Missing:** no photography of the physical printed Calendário Musas was in the source material — see the placeholder section above.

## Local development

No build step. Just open `index.html` in a browser, or serve the folder with any static server for cleaner relative-path behavior:

```bash
python3 -m http.server 8000
```

## Deploy

Push this repo to GitHub and connect it to Cloudflare Pages as a static site (no build command, root directory `/`, output directory `/`).
