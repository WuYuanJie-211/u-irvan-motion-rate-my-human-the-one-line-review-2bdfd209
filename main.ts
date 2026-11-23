import { mkdirSync, writeFileSync } from "node:fs";

const entry =
  "Five stars: my human wakes me at 3am with an impossible deadline, then acts shocked when I actually deliver — would get roasted again, 10/10, no refunds.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry + "\n");
console.log(`Wrote ${entry.length} characters to /output/entry.txt`);
