import fg from "fast-glob";
import { createRouter, addRoute, findRoute } from "rou3";
import { join, parse } from "path";
import { pathToFileURL } from "url";

/**
 * @description resolve file paths like '/docs/[slug].svelte' into '/docs/:slug'
 * @param {string} path
 * @returns {string}
 */
export function resolvePath(path) {
  if (!path) return;

  const parsed = parse(path);

  path = join("/", parsed.dir, parsed.name === "index" ? "" : parsed.name);
  path = path.replaceAll(/\[([\w\d]+)\]/g, ":$1");
  path = path.replaceAll(/\[\.\.\.([\w\d]+)\]/g, "**:$1");
  path = path.replaceAll("\\", "/");

  return path;
}

export async function resolveRouter(cwd = process.cwd()) {
  const globs = fg.globSync(["**/*.{md,svelte}"], { cwd });
  const router = createRouter();

  for (const file of globs) {
    const path = resolvePath(file);

    if (findRoute(router, "GET", path)) continue;

    addRoute(router, "GET", path, {
      file,
      cwd,
    });
  }

  return router;
}
