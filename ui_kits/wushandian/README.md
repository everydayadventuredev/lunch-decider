# 午膳殿 UI Kit

Tarot-styled lunch decider. Flip a card, get a food. Deadpan, slightly cursed.

## Components
- **Ornaments.jsx** — `CardCorners`, `TierGem`, `OrnamentDivider`, `FoodNameGlow`, `StarField`. Per-tier vine/gem vocabulary.
- **CardBack.jsx** — Home card (dark tarot, brush "午膳").
- **ResultCard.jsx** — Flippable reading card. Front = full-bleed food image + name. Back = 宜/忌 seals, master quote, lucky items. Theme varies by tier (庶民/小資/放縱/苦行/傳說).
- **DevilCard.jsx** — Cursed red palette when reroll count ≥ 10. No reroll button. 遵旨.
- **HistoryPage.jsx** — 食曆: stats, achievements, entries.

## Visual rules
- `--bg` parchment base. Cards are deep tarot brown (`#1a1612`) with gold border.
- Two fonts only: `Ma Shan Zheng` for display (食 food names, section titles), `LXGW WenKai TC` for body.
- 宜/忌 seal stamps: bordered boxes rotated -6°, calligraphic.
- Never break the deadpan tone. Masters are wise AND mildly cruel.
- Use WebP food images from `assets/foods/`. Zoom 108% to hide edges.

## Interactive flow demo
Open `index.html` — the last cell loops home → result → reroll → devil.
