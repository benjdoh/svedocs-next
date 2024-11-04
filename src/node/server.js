import { createServer } from "vite";
import { resolveConfig } from "./config.js";
import { svedocs } from "./plugin.js";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export async function createSvedocsServer(cwd = process.cwd()) {
  const config = await resolveConfig(cwd);

  return createServer({
    plugins: [svelte(), svedocs(config)],
  });
}
