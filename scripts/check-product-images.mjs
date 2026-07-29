import { readFileSync } from "fs";

const src = readFileSync("src/data/products.ts", "utf8");
const blocks = src.split(/p\(\{/).slice(1);
const pairs = [];
for (const b of blocks) {
  const slug = (b.match(/slug:\s*"([^"]+)"/) || [])[1];
  const image = (b.match(/\n\s*image:\s*([^,\n]+)/) || [])[1];
  if (slug && image) pairs.push({ slug, image: image.trim() });
}
const byImg = new Map();
for (const p of pairs) {
  if (!byImg.has(p.image)) byImg.set(p.image, []);
  byImg.get(p.image).push(p.slug);
}
const dups = [...byImg.entries()].filter(([, s]) => s.length > 1);
console.log("Total products", pairs.length);
console.log("Unique images", byImg.size);
if (dups.length === 0) console.log("No duplicate primary images");
for (const [img, slugs] of dups) console.log("DUP", img, "=>", slugs.join(", "));
