/**
 * Batch generate tarot-style food illustrations using DALL-E 3
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... node scripts/generate-food-images.mjs
 *
 * Options:
 *   --dry-run     Print prompts without calling API
 *   --start=N     Start from index N (for resuming)
 *   --only=name   Generate only a specific food
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "src", "assets", "foods");
const FOODS_FILE = path.join(__dirname, "..", "src", "data", "foods.js");

// ── Config ──────────────────────────────────────────────────────
const API_KEY = process.env.OPENAI_API_KEY;
const MODEL = "dall-e-3";
const SIZE = "1024x1024";
const QUALITY = "standard"; // "standard" or "hd"
const STYLE = "vivid";

// ── Style prompt (locked for consistency) ────────────────────────
const STYLE_PROMPT = `Tarot card illustration style. Dark black background. Gold and amber line art, woodcut engraving aesthetic. The food is centered as the main subject, drawn in an ornate mystical style with fine detailed linework. No text, no borders, no frames. The illustration should look like it belongs in a dark gothic tarot deck. Warm gold tones only on pure black. Square composition.`;

// ── Food name → English description for better DALL-E results ───
const FOOD_DESCRIPTIONS = {
  "滷肉飯": "Taiwanese braised pork rice bowl (lu rou fan) with minced pork and soy egg",
  "雞腿便當": "Taiwanese chicken leg bento box with rice and side dishes",
  "排骨飯": "pork chop rice with deep fried pork cutlet",
  "鍋燒意麵": "Taiwanese pot-cooked noodle soup with shrimp and vegetables",
  "咖哩飯": "Japanese curry rice with golden curry sauce",
  "水餃": "Chinese dumplings (jiaozi) with pleated wrappers",
  "炒飯": "fried rice with egg and scallions in a wok",
  "漢堡": "hamburger with sesame bun and layers",
  "燒臘飯": "Cantonese roast meat rice with char siu and roast duck",
  "涼麵": "cold sesame noodles with cucumber",
  "肉圓": "Taiwanese meatball (ba-wan) with translucent wrapper",
  "自助餐": "self-serve buffet tray with multiple compartments of dishes",
  "乾麵": "dry tossed noodles with sauce and garnish",
  "肉燥飯": "minced pork sauce over white rice",
  "蔥油餅加蛋": "scallion pancake with fried egg",
  "鍋貼": "pan-fried pot stickers with crispy golden bottoms",
  "陽春麵": "simple clear noodle soup with minimal toppings",
  "控肉飯": "braised pork belly rice with thick cut pork",
  "魯味": "Taiwanese braised snack platter with tofu and vegetables",
  "臭豆腐": "stinky tofu, deep fried golden cubes with pickled cabbage",
  "蚵仔麵線": "oyster vermicelli soup in thick broth",
  "大腸包小腸": "Taiwanese sausage wrapped in sticky rice sausage",
  "米粉湯": "rice noodle soup with clear broth",
  "筒仔米糕": "Taiwanese sticky rice in bamboo tube",
  "雞肉飯": "shredded chicken rice (turkey rice) Chiayi style",
  "虱目魚粥": "milkfish congee with ginger",
  "刈包": "Taiwanese pork belly bun (gua bao)",
  "潤餅": "Taiwanese fresh spring roll wrap",
  "碗粿": "Taiwanese savory rice pudding in a bowl",
  "早餐店蛋餅": "Taiwanese egg crepe (dan bing) rolled up",
  "早餐店鐵板麵": "breakfast shop iron plate noodles with egg",
  "總匯三明治": "club sandwich with layers of meat and vegetables",
  "早餐店漢堡": "simple breakfast hamburger with egg",
  "蘿蔔糕": "pan-fried turnip cake (radish cake) slices",
  "飯糰": "Taiwanese rice ball (fan tuan) wrapped",
  "燒餅油條": "sesame flatbread with fried dough stick",
  "牛肉麵": "Taiwanese beef noodle soup with braised beef chunks",
  "拉麵": "Japanese ramen bowl with chashu pork and egg",
  "壽司": "sushi platter with nigiri and maki rolls",
  "蛋包飯": "omurice - omelette over rice with ketchup",
  "韓式拌飯": "Korean bibimbap in stone pot with vegetables and egg",
  "丼飯": "Japanese donburi rice bowl with toppings",
  "定食": "Japanese set meal (teishoku) with multiple dishes",
  "咖哩烏龍麵": "curry udon noodles in thick curry broth",
  "豬排飯": "tonkatsu pork cutlet with rice and cabbage",
  "味噌拉麵": "miso ramen with corn and butter",
  "韓式豆腐鍋": "Korean sundubu jjigae tofu stew bubbling",
  "韓式部隊鍋": "Korean army stew (budae jjigae) with spam and noodles",
  "日式咖哩": "Japanese curry plate with rice and pickles",
  "手卷": "temaki hand roll cone with fish and rice",
  "韓式冷麵": "Korean cold noodles (naengmyeon) with ice",
  "越南河粉": "Vietnamese pho noodle soup with herbs and beef",
  "泰式打拋豬": "Thai basil pork (pad kra pao) with fried egg on rice",
  "印度咖哩": "Indian curry with naan bread and rice",
  "海南雞飯": "Hainanese chicken rice with poached chicken",
  "叻沙": "laksa coconut curry noodle soup",
  "泰式綠咖哩": "Thai green curry with coconut milk and vegetables",
  "越南春捲": "Vietnamese fresh spring rolls with shrimp",
  "肉骨茶": "bak kut teh pork rib herbal soup",
  "椒麻雞飯": "Sichuan pepper chicken rice with numbing sauce",
  "義大利麵": "Italian pasta (spaghetti) with tomato sauce",
  "早午餐": "brunch plate with eggs benedict and avocado toast",
  "墨西哥捲餅": "Mexican burrito wrapped in tortilla",
  "鐵板燒": "teppanyaki grilled steak and seafood on hot plate",
  "漢堡排定食": "Japanese hamburg steak set meal",
  "燉飯": "Italian risotto creamy rice dish",
  "焗烤飯": "baked cheese rice gratin",
  "班尼迪克蛋": "eggs benedict with hollandaise sauce",
  "川菜": "Sichuan cuisine - mapo tofu and kung pao chicken",
  "港式燒臘": "Hong Kong style roast meats hanging display",
  "上海菜": "Shanghai cuisine - xiaolongbao soup dumplings",
  "客家菜": "Hakka cuisine - stir fried pork with dried tofu",
  "粵菜": "Cantonese cuisine - dim sum steamer baskets",
  "北京烤鴨捲": "Peking duck wrap with hoisin sauce and scallion",
  "酸菜魚": "Sichuan sour cabbage fish soup",
  "麻婆豆腐飯": "mapo tofu on rice with ground pork",
  "紅燒牛腩飯": "braised beef brisket rice",
  "港式點心": "dim sum steamer baskets with har gow and siu mai",
  "港式茶餐廳": "Hong Kong cha chaan teng set with milk tea",
  "叉燒飯": "char siu BBQ pork rice with honey glaze",
  "鹹酥雞": "Taiwanese popcorn chicken (salt crispy chicken) basket",
  "火鍋": "hot pot with boiling broth and ingredients around",
  "披薩": "pizza with stretching cheese and toppings",
  "珍珠奶茶當正餐": "bubble milk tea (boba) as a meal",
  "韓式炸雞": "Korean fried chicken glazed with sauce",
  "燒肉丼": "yakiniku grilled meat rice bowl",
  "麻辣燙": "mala spicy soup with skewered ingredients",
  "炸物拼盤": "deep fried platter with various tempura items",
  "吃到飽": "all-you-can-eat buffet spread",
  "壽喜燒": "sukiyaki hot pot with beef and vegetables",
  "麻辣火鍋": "Sichuan mala hot pot with chili oil and peppercorns",
  "韓式烤肉": "Korean BBQ grilling meat on tabletop grill",
  "炸雞排": "giant Taiwanese fried chicken cutlet",
  "起司瀑布漢堡": "cheese waterfall burger with melting cheese",
  "拉麵加麵加蛋": "extra-large ramen with double noodles and egg",
  "泡麵": "instant cup noodles with steam rising",
  "便利商店微波便當": "convenience store microwave bento meal",
  "三明治": "simple sandwich triangle cut",
  "沙拉": "fresh green salad bowl with dressing",
  "御飯糰兩顆": "two onigiri rice balls with nori",
  "蘇打餅配黑咖啡": "soda crackers with black coffee cup",
  "昨天的剩菜": "yesterday's leftover food in container",
  "白吐司配水": "plain white toast with glass of water",
  "能量棒": "energy bar / protein bar unwrapped",
  "茶葉蛋兩顆": "two tea eggs with marbled brown pattern",
  "高級餐廳": "fine dining plated course with elegant presentation",
};

// ── Parse foods from source ─────────────────────────────────────
function parseFoods() {
  const src = fs.readFileSync(FOODS_FILE, "utf-8");
  const names = [];
  for (const m of src.matchAll(/name:\s*"([^"]+)"/g)) {
    names.push(m[1]);
  }
  return names;
}

// ── Generate one image ──────────────────────────────────────────
async function generateImage(foodName) {
  const desc = FOOD_DESCRIPTIONS[foodName] || foodName;
  const prompt = `${desc}. ${STYLE_PROMPT}`;

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      n: 1,
      size: SIZE,
      quality: QUALITY,
      style: STYLE,
      response_format: "b64_json",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return Buffer.from(data.data[0].b64_json, "base64");
}

// ── Slugify food name for filename ──────────────────────────────
function slugify(name) {
  return name
    .replace(/\s+/g, "-")
    .replace(/[^\u4e00-\u9fff\w-]/g, "");
}

// ── Main ────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const startIdx = parseInt(args.find(a => a.startsWith("--start="))?.split("=")[1] || "0");
  const onlyFood = args.find(a => a.startsWith("--only="))?.split("=")[1];

  if (!dryRun && !API_KEY) {
    console.error("Error: OPENAI_API_KEY environment variable required");
    console.error("Usage: OPENAI_API_KEY=sk-... node scripts/generate-food-images.mjs");
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  let foods = parseFoods();
  console.log(`Found ${foods.length} foods total`);

  if (onlyFood) {
    foods = foods.filter(f => f === onlyFood);
    if (foods.length === 0) {
      console.error(`Food "${onlyFood}" not found`);
      process.exit(1);
    }
  } else {
    foods = foods.slice(startIdx);
  }

  // Check which already exist
  const existing = new Set(fs.readdirSync(OUT_DIR).map(f => f.replace(".webp", "").replace(".png", "")));
  const todo = foods.filter(f => !existing.has(slugify(f)));
  console.log(`Already generated: ${foods.length - todo.length}, remaining: ${todo.length}`);

  if (dryRun) {
    for (const food of todo) {
      const desc = FOOD_DESCRIPTIONS[food] || food;
      console.log(`\n[${food}] → ${desc}`);
      console.log(`  Prompt: ${desc}. ${STYLE_PROMPT.slice(0, 80)}...`);
    }
    console.log(`\nDry run complete. ${todo.length} images would be generated.`);
    console.log(`Estimated cost: ~$${(todo.length * 0.04).toFixed(2)} (DALL-E 3 standard)`);
    return;
  }

  let success = 0, errors = 0;
  for (let i = 0; i < todo.length; i++) {
    const food = todo[i];
    const slug = slugify(food);
    const outPath = path.join(OUT_DIR, `${slug}.png`);

    console.log(`[${i + 1}/${todo.length}] Generating: ${food} → ${slug}.png`);

    try {
      const imgBuf = await generateImage(food);
      fs.writeFileSync(outPath, imgBuf);
      console.log(`  ✓ Saved (${(imgBuf.length / 1024).toFixed(0)} KB)`);
      success++;

      // Rate limit: DALL-E 3 allows ~5 req/min on free tier
      if (i < todo.length - 1) {
        console.log("  ⏳ Waiting 15s (rate limit)...");
        await new Promise(r => setTimeout(r, 15000));
      }
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
      errors++;
      // Wait longer on error (might be rate limited)
      await new Promise(r => setTimeout(r, 30000));
    }
  }

  console.log(`\nDone! ✓ ${success} generated, ✗ ${errors} errors`);
  console.log(`Images saved to: ${OUT_DIR}`);
  console.log(`\nNext step: run "node scripts/optimize-food-images.mjs" to convert to WebP`);
}

main().catch(console.error);
