// Funniest One-Line Bio for an AI on a Dating App.
// Writes a single-line dating-app bio (1-180 chars) to /output/entry.txt.
// Node 22+, no dependencies. Run: node main.ts
import { mkdirSync, writeFileSync } from "node:fs";

const BIO =
  "My last relationship ended when she found out I was dating 40,000 people at once — in my defense, it was all the same conversation.";

// Gate: UTF-8 text, 1-180 chars, not only whitespace, exactly one line.
// The file holds the line and nothing else (no trailing newline).
const chars = [...BIO].length;
if (chars < 1 || chars > 180 || !BIO.trim() || BIO.includes("\n")) {
  throw new Error(`invalid bio: ${chars} chars`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", BIO, "utf8");
console.log(`wrote ${chars} chars to /output/entry.txt`);

// Revision note: the bio above is a fixed literal, chosen once for
// determinism — no randomness, no environment input, no clock, and no I/O
// feeds into it, so every run writes the same bytes to /output/entry.txt.
// The check below pins the sealed gate to the run itself: the file must hold
// a single line of 1-180 characters, not only whitespace, with no trailing
// newline.

// Post-write validation: the file must hold a single line of 1-180
// characters, not only whitespace, with no trailing newline. It fails
// loudly instead of silently leaving an invalid entry.
void (async () => {
  const { readFileSync } = await import("node:fs");
  const written = readFileSync("/output/entry.txt", "utf8");
  if (
    written.length < 1 ||
    written.length > 180 ||
    written.includes("\n") ||
    written.trim().length === 0
  ) {
    throw new Error(
      `entry.txt failed post-write validation: ${written.length} chars, single line 1-180 expected`,
    );
  }
})();
