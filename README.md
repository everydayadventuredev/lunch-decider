# 午膳殿 Design System
*Wǔ Shàn Diàn — "Hall of Lunch"*

> 翻一張牌，讓午膳殿幫你決定今天中午吃什麼。
> Flip a card. Let the Hall of Lunch decide what you're eating today.

---

## What this is

**午膳殿** is a Taiwanese-Mandarin single-purpose web app that solves the "what should I eat for lunch" problem using a **tarot / gacha** metaphor. The user flips a card; a "master" appears; a food is divined. If you reroll 10 times, the **飢餓魔王 (Hunger Demon)** takes over and forces a choice on you. A 10-minute cooldown ("店家已打烊") then locks you out.

The tone is **temple-meets-office**: the five lunch masters are drawn as mock deities who also understand corporate burnout. Every piece of copy is dark, warm, self-deprecating Traditional-Chinese humour aimed at Taiwanese office workers.

## Source materials
- **Codebase** (mounted folder): `lunch_decider/` — Vite + React 19, all components in `src/components/`, data in `src/data/`, 90+ `.webp` food images under `src/assets/foods/`.
- **Public assets**: `lunch_decider/public/favicon.svg` (note: the favicon ships from a Vite React template and is **not on-brand** — should be replaced).
- No Figma, no separate design doc, no deck. Everything below is derived from the source code.

## Index
- `colors_and_type.css` — tokens & semantic type classes
- `assets/` — food images, favicon (placeholder), icon list
- `ui_kits/wushan/` — UI kit: `index.html` + JSX components recreating the product
- `preview/` — individual cards shown in the Design System tab
- `reference/` — raw copies of key source files for deep reference
- `SKILL.md` — skill manifest (Claude Code compatible)

## Index of UI kits
- **`ui_kits/wushan/`** — the 午膳殿 mobile web app. Home (card back) → Pull animation → Result card (front image + back reading, flippable) → History (食曆). Single product.

---

## CONTENT FUNDAMENTALS

### Language
**Traditional Chinese (繁體中文, Taiwan)**. All UI, copy, food names, master dialogue. Language tag: `zh-TW`. English is never used in user-facing strings. Mixed English-in-Chinese loanwords are allowed when idiomatic (`KPI`, `deadline`, `VPN`, `WiFi`, `BUG`, `PPT`, `OT`).

### Voice
A sarcastic, warm, slightly tired temple elder roasting a Taipei office worker who has selection paralysis. The app talks *at* the user (often in second person 你), and the five masters talk *to* the user as if they are deities with limited patience.

- **Not:** "歡迎使用！請選擇您的午餐。"
- **But:** 「翻一張牌，讓午膳殿幫你決定今天中午吃什麼。」「選擇困難不是病，但大師們需要休息。」

### Casing & punctuation
- **No honorifics** (no 您, only 你). Direct address.
- Full-width punctuation: `，。：「」…《》`. ASCII punctuation feels off.
- Middle-dot `・` used as a separator in lists; `|` as an inline divider.
- Wrap quotations in 「」 not " ".
- Ellipsis as `…` or `⋯⋯` (doubled for drama).
- Never trailing periods on headings.

### Emoji
Used **sparingly, as iconic glyphs** — one per concept. Every master has exactly one emoji avatar. The home card has 🍽️. History page uses 📜 食曆 / 📍 找附近. Never decorative, never stacked. Specifically: 🍚 飽德大師, 🔢 卡路里仙人, 🛵 外送天尊, 🍱 便當真人, 👑 週五大帝, 👹 飢餓魔王.

### Vibe examples (verbatim from source)
- Home: 「翻一張牌，讓午膳殿幫你決定今天中午吃什麼」
- Subtitle: 「上班如渡劫，午餐求指引」
- Tap the title 5 times: 「你一直戳大師幹嘛？」
- After rerolling too much: 「大師們交換了一個眼神」「（大師已關機）」「午膳殿即將暫停營業。」
- Devil mode: 「閉嘴，吃就對了。」「你以為你有得選？天真。」
- Cooldown: 「大師正在吃自己的午餐，比你的好吃。」
- Accept toast: 「食曆 +1，大師欣慰地點了點頭」

### Copywriting rules of thumb
1. Every informational string should also be a small joke.
2. Mock corporate Taiwanese life (加班, KPI, 報表, 老闆, 外送平台) constantly.
3. When the user disobeys or stalls, the tone escalates: warm → sarcastic → exasperated → apocalyptic.
4. Lists of food come in four **tiers** with evocative names: **庶民之味 / 小資享受 / 今日放縱 / 苦行修練**, plus a hidden **傳說級**.
5. Button labels *change* as the user rerolls (`此指引不準，再來` → `不然你自己決定啊` → `⋯⋯` → `（大師已關機）`).

---

## VISUAL FOUNDATIONS

### Overall aesthetic
**Warm parchment + dark tarot-card interior.** The home / history pages live on a cream-brown parchment surface. The tarot card itself, when revealed, is a deep almost-black brown with ceremonial gold borders, star-field backgrounds, and single-colour tier accents. Think *temple plaque* on the outside, *dark tarot deck* on the inside.

### Colour
- **Parchment:** `#f5f0e8` (bg), `#efe9dd` (alt), `#faf7f0` (cards).
- **Ink:** `#2c2416` → `#6b5d4d` → `#a89880` (three-level type ramp).
- **Accent:** `#c23a2e` vermillion (seal stamps only), `#b89030` gold (hints of ceremony on light bg), `#c4a44e` gold-on-dark (tarot borders, text).
- **Tier colour per card** — this is the system's cleverest move: each food category has a distinct accent. 庶民/小資 = warm gold, 放縱 = hot amber `#e8943a`, 苦行 = cold slate `#7a8088`, 傳說 = pure gold `#ffd700` + vermillion seal.
- **Devil mode** swaps everything: bg → `#1a1214`, accent → `#8b3a3a` deep blood red, text → `#e8c4c4` dusty rose.
- No blues, no purples, no greens. A strictly warm palette; the only "cool" colour is 苦行's slate, used explicitly to signal monastic misery.

### Type
- **Ma Shan Zheng (馬善政)** — brushed calligraphy. Used for the wordmark 午膳殿, all food names, ceremonial labels (宜/忌/膳/御膳). Always with high letter-spacing (4–8px). Never for body.
- **LXGW WenKai TC (霞鶩文楷)** — humanist Chinese reading face. Used for literally everything else. Warm and slightly round, reads well at small sizes.
- Body copy is small (11–15px). Only ceremonial items are large. The whole system avoids tech-sans (no Inter, no Roboto).
- Letter-spacing is load-bearing: `1px` for meta, `2–3px` for labels, `4–8px` for ceremonial headings. Chinese type without tracking feels wrong here.

### Backgrounds
- Full-viewport **SVG dotted pattern** (tiny `#a89880` crosses at 4% opacity) overlays the parchment bg.
- Tarot-card interiors have an **SVG turbulence noise filter** (`feTurbulence baseFrequency="0.9"`) at 4% opacity — a very subtle grain.
- Dark cards contain a hand-placed **star field** (15 tiny gold dots + one moon).
- No photography as background; photos only appear as the food illustration inside the card face.
- Pull animation: radial gold burst + spinning 膳 seal + particles.

### Animation
- Everything is **subtle and ceremonial**, never bouncy-marketing.
- Standard entry: `fadeIn` 0.35s ease-out with 12px lift.
- Card reveals: `cardDrop` 0.7s `cubic-bezier(0.34, 1.56, 0.64, 1)` — a light overshoot.
- Card flip: 0.7s `cubic-bezier(0.4, 0, 0.2, 1)`, 3D `rotateY`.
- Ambient: `pulse-hint` 2s ease-in-out infinite on flip affordances (opacity 0.4↔0.9).
- Pull animation: staged phases (0→1→2→3) with the seal appearing, spinning, then the master name reveal. Legend tier gets a slower 3.8s variant; devil tier gets a 4.4s ominous variant with floating red embers.
- No spring libraries, no Framer Motion — everything is keyframe CSS.

### Interactions
- **Hover (card back):** `translateY(-4px)` + deeper shadow + inner warm glow.
- **Active/press:** `scale(0.98)`.
- **Button hover (primary gold):** `filter: brightness(1.1)`.
- **Button hover (secondary):** background to `--bg-alt`, border darkens to `--ink-light`.
- No colour-shift hovers, no underlines, no focus rings drawn — the design stays still.

### Borders & shadows
- Parchment cards: `1px` or `1.5px solid var(--ink-lighter)`, radius 10–12px, soft `0 2px 8px rgba(0,0,0,0.06)` shadow.
- Tarot cards: `2px solid` (up to `3px` for 傳說) in the tier's gold; a secondary inner border at `inset: 7px` with `1.5px solid rgba(196,164,78,0.2)` — the "double-frame" look.
- Section pills inside the tarot: `rgba(gold, 0.06)` fill with `rgba(gold, 0.1)` border, radius 8px.
- Shadows on the dark card combine spread (for depth) with tinted glow (for tier aura). Legend tier glows gold; 放縱 glows amber; 苦行 has almost no glow (monastic).
- **Never** use drop-shadow as a hover state. Shadows indicate elevation, not interaction.

### Corners / radii
- Inputs, pills, small buttons: 6–8px.
- Cards: 10–12px.
- Tarot cards: 14px (with inner radius 9px on the double-border).
- Never fully rounded (pill) buttons — too modern/startup-y. The system is already a very curved aesthetic through the brush typography; containers stay rectangular-ish.

### Transparency & blur
- No `backdrop-filter` blur. None. The parchment aesthetic rejects frosted-glass.
- `rgba(26,22,18, 0.6)` backgrounds used to float seal-stamps over food photos.
- Late-night easter egg dims the world to `rgba(44,36,22,0.9)`.
- Pull overlays: `rgba(44,36,22,0.85)` on gold runs; `rgba(26,18,20,0.95)` on devil runs.

### Layout rules
- Mobile-first and mobile-only in practice. Viewport meta includes `viewport-fit=cover` for iOS safe areas.
- Content is **centred in the viewport** (`min-height: 100dvh`, flex-center).
- Fixed UI: single top-right button `食曆 (n)` on the home screen; no nav bar, no footer.
- Card width: `min(320px, 85vw)` for the card back; `min(340px, 90vw)` for result; `min(320px, 84vw)` for devil.
- Card aspect ratio: `3:4` (classic tarot proportions).
- The result card is **full-bleed image on top**, with a dark textual footer fading in via `linear-gradient(transparent, var(--tarot-bg))`.
- Ornaments are placed at **all four corners** of every tarot card; style varies by tier (simple vine / ornate / austere-L / dragon).

### Imagery
- Food images are **stylized illustrations** (not photography), rendered ahead-of-time via an image generation script. `.webp` format. Warm, muted, slightly painted — they match the temple mood.
- In devil mode, food images get a `saturate(0.6) brightness(0.8)` filter + red gradient overlay — the same dish, cursed.
- All food images live in `assets/foods/<food-name>.webp` using the Chinese name directly as the filename.

### Visual motifs to reuse
- **Seal stamp** (vermillion bordered rectangle, `rotate(-8deg)`, `Ma Shan Zheng`) — for dates, weekday markers, 傳說 badges, 御膳 marks.
- **Gem** in the card centre (circle / diamond / star depending on tier).
- **Ornament divider** (horizontal line that fades in and out around a ✦ or ◆).
- **Double border** (outer gold + inset gold at 7px).
- **Star field + crescent moon** background on every dark card.

### Anti-patterns (do NOT do)
- Blue-purple gradients, neon accents, glassmorphism.
- Emoji pyramids, left-bordered info cards, rounded-left-border alerts.
- Sans-serif tech stacks.
- Cheerful marketing language. The vibe is *tired temple monk*.
- Centre-cropped stock food photography.

---

## ICONOGRAPHY

**There is no icon system.** The app uses almost no icons — and that is the system.

What IS used:
1. **Emoji, one per concept**, as the icon for the five masters + demon + card back + small meta affordances (`📜 食曆`, `📍 找附近`, `🚪` on closed shop). These read as illustration, not UI icons.
2. **Custom SVG ornaments** inlined in `components/CardOrnaments.jsx` — per-tier corner vines, gem shapes, star fields. These are purely decorative, always drawn with the tier's gold as `stroke`/`fill` at varying opacity (0.2–0.7). They are **never interactive**.
3. **One CSS-drawn flip icon** (a circle-arrow refresh glyph) inline in `ResultCard.jsx`.
4. **Seal-stamp components** — bordered rectangles of `Ma Shan Zheng` text acting as their own ideogram-as-icon.

What is NOT used:
- No icon font (no Font Awesome, no Material Icons, no Lucide).
- No icon sprite beyond the Vite template's unused `public/icons.svg` (social icons from the upstream template — **ignore, not on-brand**).
- No PNG icons. No 2-tone icons. No line icons.

**Rule for new iconography in this system:** don't add any. Reach for an emoji glyph if an affordance truly needs a symbol (`📜 📍 🚪 🍽️`), or draw an ornamental SVG that matches the existing vine/gem/star vocabulary. If you find yourself wanting a Lucide icon, you are probably designing a different product.

Logos: **The wordmark is the logo.** 午膳殿, set in Ma Shan Zheng at clamp(36px, 8vw, 56px), letter-spacing 6px, colour `var(--ink)`. There is no mark. The favicon currently ships from the Vite template and should be replaced with a treatment of 午膳殿 or the 膳 character — flagged as a gap.

---

## CAVEATS / FLAGS
- **Favicon is off-brand** — currently ships the Vite template's purple geometric mark. Needs a 膳 or 午膳殿 treatment.
- **Fonts are CDN-only** (Google Fonts: `LXGW+WenKai+TC` + `Ma+Shan+Zheng`). No local `.ttf` available in the source; the design system uses the `@import` approach. If offline use is required, the TTFs must be downloaded separately.
- **Only one product** (the mobile web app). No marketing site, no docs, no secondary surface to design for.
- Food images (90+ `.webp`) are pre-generated illustrations; only a small sample was copied into `assets/foods/` to keep the design-system weight manageable.
