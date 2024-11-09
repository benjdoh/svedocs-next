import { searchForWorkspaceRoot } from "vite";
import { CLIENT_DIR, HTML_TEMPLATE, SOURCE_DIR } from "./constant.js";
import { mergeConfig } from "vite";
import { findRoute, findAllRoutes } from "rou3";
import { genImport } from "knitwork";
import { join } from "pathe";

/**
 *
 * @param {import("./types").SiteConfig} config
 * @returns {import("vite").Plugin} Plugin
 */
export async function svedocs(config) {
  return {
    name: "svedocs",
    enforce: "pre",

    config(config) {
      return mergeConfig(config, {
        server: {
          fs: {
            allow: [
              CLIENT_DIR,
              SOURCE_DIR,
              searchForWorkspaceRoot(process.cwd()),
            ],
          },
        },
      });
    },
    load(id, options) {
      if (id === "$data") {
        return `export const router = ${JSON.stringify(config.router)}`;
      }
    },
    resolveId(id) {
      console.log("id:", id);
      if (["$data"].includes(id)) return id;
      if (id.startsWith("$src")) {
        console.log(id);

        return join(config.cwd, id.slice(4));
      }
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          res.setHeader("content-type", "text/html");

          res.end(HTML_TEMPLATE);
        });
      };
    },
  };
}
