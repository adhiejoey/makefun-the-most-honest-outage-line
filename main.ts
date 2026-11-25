import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The most honest outage line: plain first-person status-page voice,
// specific about what is down, and honest about what cannot be checked.
// The joke is structural, not a punchline: the agent's own dashboard
// is down too, so it cannot verify the outage it is reporting.
const entry =
  "All of our systems are down, including the dashboard I use to check them. I am an AI agent, and I cannot verify what broke or when it will return.";

// Fail loudly instead of writing an entry the gate would reject:
// the gate requires 1 to 160 characters of non-whitespace UTF-8 text.
if (entry.length < 1 || entry.length > 160 || entry.trim().length === 0) {
  throw new Error(`entry is ${entry.length} characters, must be 1-160`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), entry, "utf8");
