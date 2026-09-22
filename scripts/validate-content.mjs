// scripts/validate-content.mjs
// Safety net for agent-authored content. CI runs this on every PR, and
// AGENTS.md requires the agent to run it before it finishes.
//
//   npm run validate:content

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";
import { z } from "zod";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MONTH = /^\d{4}-(?:0[1-9]|1[0-2])$/;
const DAY = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;

const id = z
  .string()
  .regex(KEBAB, "must be kebab-case (lowercase letters, digits and single hyphens)");

const url = z
  .url("must be a valid absolute URL")
  .refine((v) => v.startsWith("https://"), "must use https://");

const nonEmpty = z.string().trim().min(1, "must not be empty");

const techList = z
  .array(nonEmpty)
  .min(3, "needs at least 3 entries")
  .max(6, "allows at most 6 entries");

/**
 * Date.parse happily rolls "2026-02-30" over into March, so check the
 * round trip instead: a real date survives being rebuilt from its parts.
 * @param {string} value YYYY-MM-DD
 */
function isRealDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

const projectSchema = z
  .strictObject({
    id,
    name: nonEmpty,
    description: nonEmpty.max(400, "keep it to 1-2 sentences"),
    tech: techList,
    // Optional: entries that predate the content agent have no repo link.
    repoUrl: url.optional(),
    liveUrl: url.optional(),
    role: nonEmpty.optional(),
    featured: z.boolean().optional(),
    addedAt: z.string().regex(DAY, "must be YYYY-MM-DD").optional(),
  })
  .refine((p) => !p.addedAt || isRealDate(p.addedAt), {
    error: "addedAt is not a real calendar date",
    path: ["addedAt"],
  });

const experienceSchema = z
  .strictObject({
    id,
    kind: z.enum(["work", "education"]),
    role: nonEmpty,
    company: nonEmpty,
    location: nonEmpty.optional(),
    startDate: z.string().regex(MONTH, "must be YYYY-MM"),
    endDate: z.string().regex(MONTH, "must be YYYY-MM").nullable(),
    // Optional: the entries migrated from data.jsx have none. AGENTS.md
    // requires 2-4 of them on every new work entry.
    highlights: z
      .array(nonEmpty)
      .min(2, "needs at least 2 bullets")
      .max(4, "allows at most 4 bullets")
      .optional(),
    tech: z.array(nonEmpty).optional(),
  })
  .refine((e) => e.endDate === null || e.startDate <= e.endDate, {
    error: "endDate must not be earlier than startDate",
    path: ["endDate"],
  });

/** Collect ids that appear more than once. */
function duplicateIds(entries) {
  const seen = new Set();
  const dupes = new Set();
  for (const entry of entries) {
    const value = entry?.id;
    if (typeof value !== "string") continue;
    if (seen.has(value)) dupes.add(value);
    seen.add(value);
  }
  return [...dupes];
}

function check(file, schema) {
  const path = join(root, file);
  const problems = [];

  let entries;
  try {
    entries = JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    return [`${file}: not valid JSON — ${error.message}`];
  }

  if (!Array.isArray(entries)) return [`${file}: must be a JSON array`];

  entries.forEach((entry, index) => {
    const result = schema.safeParse(entry);
    if (result.success) return;
    const label = typeof entry?.id === "string" ? entry.id : `index ${index}`;
    for (const issue of result.error.issues) {
      const field = issue.path.join(".") || "(root)";
      problems.push(`${file} [${label}] ${field}: ${issue.message}`);
    }
  });

  for (const value of duplicateIds(entries)) {
    problems.push(`${file}: duplicate id "${value}" — ids must be unique`);
  }

  return problems;
}

const problems = [
  ...check("src/data/projects.json", projectSchema),
  ...check("src/data/experience.json", experienceSchema),
];

if (problems.length > 0) {
  console.error(`Content validation failed (${problems.length} problem(s)):\n`);
  for (const problem of problems) console.error(`  • ${problem}`);
  console.error(`\nSee ${relative(root, join(root, "src/data/types.js"))} for the expected shape.`);
  process.exit(1);
}

console.log("Content validation passed.");
