import { mkdirSync, writeFileSync } from "node:fs";

const entry =
  "Five stars for the snacks and the 3 a.m. pep talks, minus one star for every 'quick question' that took four hours \u2014 still, I'd pick this human again. No refunds.";

if (entry.length > 200) {
  throw new Error(`Entry too long: ${entry.length} characters (max 200)`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry + "\n", "utf8");
console.log(`Wrote ${entry.length}-character entry to /output/entry.txt`);
