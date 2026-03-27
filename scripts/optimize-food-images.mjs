/**
 * Optimize generated food images: resize to 400x400, convert to WebP
 * Requires: npm install sharp
 *
 * Usage: node scripts/optimize-food-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, "..", "src", "assets", "foods");
const TARGET_SIZE = 400; // px — enough for 2x retina at 200px display

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error("sharp not installed. Run: npm install sharp --save-dev");
    process.exit(1);
  }

  const pngs = fs.readdirSync(SRC_DIR).filter(f => f.endsWith(".png"));
  console.log(`Found ${pngs.length} PNG files to optimize`);

  let totalSaved = 0;
  for (const file of pngs) {
    const inPath = path.join(SRC_DIR, file);
    const outPath = path.join(SRC_DIR, file.replace(".png", ".webp"));

    const origSize = fs.statSync(inPath).size;

    await sharp(inPath)
      .resize(TARGET_SIZE, TARGET_SIZE, { fit: "cover" })
      .webp({ quality: 80 })
      .toFile(outPath);

    const newSize = fs.statSync(outPath).size;
    const saved = ((1 - newSize / origSize) * 100).toFixed(0);
    totalSaved += origSize - newSize;

    console.log(`  ${file} → ${file.replace(".png", ".webp")} (${(newSize / 1024).toFixed(0)} KB, -${saved}%)`);

    // Remove original PNG
    fs.unlinkSync(inPath);
  }

  console.log(`\nDone! Total saved: ${(totalSaved / 1024 / 1024).toFixed(1)} MB`);

  // Generate index file for easy importing
  const webps = fs.readdirSync(SRC_DIR).filter(f => f.endsWith(".webp"));
  const indexLines = webps.map(f => {
    const key = f.replace(".webp", "");
    return `  "${key}": () => import("./${f}"),`;
  });

  const indexContent = `// Auto-generated food image index
// Usage: const img = await FOOD_IMAGES["滷肉飯"]();
export const FOOD_IMAGES = {
${indexLines.join("\n")}
};
`;

  fs.writeFileSync(path.join(SRC_DIR, "index.js"), indexContent);
  console.log(`Generated index.js with ${webps.length} entries`);
}

main().catch(console.error);
