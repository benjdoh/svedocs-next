import { searchForWorkspaceRoot } from "vite";
import { CLIENT_DIR, HTML_TEMPLATE, SOURCE_DIR } from "./constant.js";
import { mergeConfig } from "vite";
import { findRoute } from "rou3";

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
      if (id === "$data")
        return `
      export const router = ${JSON.stringify(config.router)}
      `;
    },
    resolveId(id) {
      if (id === "$data") return id;
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (!findRoute(config.router, req.method, req.originalUrl)) {
            return next();
          }

          res.setHeader("content-type", "text/html");

          res.end(HTML_TEMPLATE);
        });
      };
    },
  };
}
