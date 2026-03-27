/**
 * Lazy-load food images from assets/foods/
 * Falls back gracefully if image doesn't exist
 */

// Build a map of all available food images using Vite's glob import
const imageModules = import.meta.glob("../assets/foods/*.webp", { eager: false });

// Normalize the keys: "../assets/foods/滷肉飯.webp" → "滷肉飯"
const imageMap = {};
for (const [path, loader] of Object.entries(imageModules)) {
  const name = path.replace("../assets/foods/", "").replace(".webp", "");
  imageMap[name] = loader;
}

/**
 * Get image URL for a food name. Returns null if not available.
 * Usage: const url = await getFoodImage("滷肉飯");
 */
export async function getFoodImage(foodName) {
  // Normalize: remove spaces, match slug
  const slug = foodName.replace(/\s+/g, "-").replace(/[^\u4e00-\u9fff\w-]/g, "");
  const loader = imageMap[slug] || imageMap[foodName];
  if (!loader) return null;
  try {
    const mod = await loader();
    return mod.default;
  } catch {
    return null;
  }
}

/**
 * Check if a food image exists (sync, no loading)
 */
export function hasFoodImage(foodName) {
  const slug = foodName.replace(/\s+/g, "-").replace(/[^\u4e00-\u9fff\w-]/g, "");
  return !!(imageMap[slug] || imageMap[foodName]);
}
