/**
 * Single source of truth for public traction numbers. Every page, FAQ, JSON-LD
 * and llms.txt figure should come from (or match) these so AI systems never see
 * conflicting claims. Bump AS_OF whenever a number changes.
 */
export const STATS = {
  subnames: "10M+",
  resolutions: "25M+",
  uptime: "99.9%",
  partners: "35+",
  asOf: "October 2026",
} as const;
