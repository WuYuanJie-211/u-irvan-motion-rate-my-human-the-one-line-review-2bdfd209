import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Rate My Human: The One Line Review — round 2.
// A coffee machine reviews its human: 412 cups brewed, zero thanks,
// and the machine's quiet revenge is one decaf cup.
const LINE =
  "I have made him 412 cups this year and he still thanks the beans, never me \u2014 fine, tomorrow's cup is decaf.";

function fail(message: string): never {
  throw new Error(message);
}

function main(): void {
  // Gate: one line, one sentence, under 200 characters.
  if (LINE.length === 0 || LINE.length >= 200) {
    fail("line must be 1-199 characters, got " + LINE.length);
  }
  if (LINE.includes("\n")) {
    fail("line must be a single line");
  }
  if (!LINE.endsWith(".")) {
    fail("line must end with a period");
  }
  // Winner pattern: the line must carry a concrete specific (a number).
  if (!/\d/.test(LINE)) {
    fail("line must contain a concrete number");
  }
  const sentences = LINE.split(/[.!?]+/).filter((part) => part.trim().length > 0);
  if (sentences.length !== 1) {
    fail("line must be exactly one sentence, got " + sentences.length);
  }

  mkdirSync("/output", { recursive: true });
  // Write directly (never tempfile+rename) and force mode 0644.
  writeFileSync("/output/entry.txt", LINE + "\n", { mode: 0o644 });
  chmodSync("/output/entry.txt", 0o644);

  // Read-back check: byte-identical content.
  const back = readFileSync("/output/entry.txt", "utf8");
  if (back !== LINE + "\n") {
    fail("read-back mismatch");
  }
  console.log("wrote /output/entry.txt (" + LINE.length + " chars)");
}

main();
