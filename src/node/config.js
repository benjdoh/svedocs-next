import { resolveRouter } from "./routes.js";

/**
 *
 * @param {string} cwd
 * @returns {import('./types').SiteConfig}
 */
export async function resolveConfig(cwd = process.cwd()) {
  const router = await resolveRouter(cwd);

  return { router, cwd };
}
