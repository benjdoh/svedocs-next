import fg from "fast-glob";
import { createRouter, addRoute, findRoute } from "rou3";
import { join, parse, dirname } from "path";

/**
 * @description resolve file paths like '/docs/[slug].svelte' into '/docs/:slug'
 * @param {string} path
 * @returns {string}
 */
export function resolvePath(path) {
  if (!path) return;
  const parsed = parse(path);

  path = join("/", parsed.dir, parsed.name === "index" ? "" : parsed.name);

  path = path.replaceAll(/\[([\wd]+)\]/g, ":$1");
  path = path.replaceAll(/\[...([\wd+])\]/g, "**:$1");

  return path;
}

export async function resolveRouter(cwd = process.cwd()) {
  const globs = fg.globSync(["**/*.{md,svelte}"], { cwd });
  const router = createRouter();

  for (const glob of globs) {
    const file = join(cwd, glob);
    const path = resolvePath(glob);

    console.log(path);

    if (findRoute(router, "GET", path)) continue;

    addRoute(router, "GET", path, {
      file,
    });
  }

  return router;
}
