// src/data/types.js
// Shapes for src/data/projects.json and src/data/experience.json.
// These are JSDoc-only — the runtime guarantee comes from
// scripts/validate-content.mjs, which CI runs on every PR.

/**
 * @typedef {Object} Project
 * @property {string} id           kebab-case repo name, unique across the file
 * @property {string} name
 * @property {string} description  1-2 sentences
 * @property {string[]} tech       3-6 items, properly cased (TypeScript, PostgreSQL)
 * @property {string} [repoUrl]    omitted on older entries that predate the agent
 * @property {string} [liveUrl]
 * @property {string} [role]
 * @property {boolean} [featured]  featured projects render first
 * @property {string} [addedAt]    YYYY-MM-DD
 */

/**
 * @typedef {Object} Experience
 * @property {string} id                  e.g. "acme-frontend-engineer", unique
 * @property {"work" | "education"} kind
 * @property {string} role
 * @property {string} company
 * @property {string} startDate           YYYY-MM
 * @property {string | null} endDate      null = present
 * @property {string} [location]
 * @property {string[]} [highlights]      2-4 bullets; required for new work entries
 * @property {string[]} [tech]
 */

export {};
