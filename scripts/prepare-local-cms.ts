import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const persistToIndex = process.argv.indexOf("--persist-to");
const persistTo =
  persistToIndex >= 0 ? process.argv[persistToIndex + 1] : undefined;
if (persistToIndex >= 0 && !persistTo) {
  throw new Error("--persist-to requires a directory");
}
const persistenceArgs = persistTo ? ["--persist-to", persistTo] : [];

function run(args: string[]) {
  execFileSync("npx", ["wrangler", ...args, ...persistenceArgs], {
    stdio: "inherit",
  });
}

run(["d1", "migrations", "apply", "DB", "--local"]);
run(["d1", "migrations", "apply", "CONTENT_DB", "--local"]);
run([
  "d1",
  "execute",
  "NEXT_TAG_CACHE_D1",
  "--local",
  "--command",
  "CREATE TABLE IF NOT EXISTS revalidations (tag TEXT NOT NULL, revalidatedAt INTEGER NOT NULL, stale INTEGER, expire INTEGER default NULL, UNIQUE(tag) ON CONFLICT REPLACE);",
]);

const directory = mkdtempSync(join(tmpdir(), "personalsite-cms-seed-"));
const seedPath = join(directory, "seed.sql");
try {
  const seed = execFileSync("npx", ["tsx", "scripts/generate-content-seed.ts"], {
    encoding: "utf8",
  });
  writeFileSync(seedPath, seed, { encoding: "utf8", mode: 0o600 });
  run(["d1", "execute", "CONTENT_DB", "--local", "--file", seedPath]);
} finally {
  rmSync(directory, { recursive: true, force: true });
}

process.stdout.write("Local D1 schemas and canonical seed are ready.\n");
