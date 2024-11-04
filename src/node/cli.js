import { defineCommand, createMain } from "citty";
import { createSvedocsServer } from "./server.js";
import { isAbsolute, join } from "path";
import { pkg } from "./constant.js";

const dev = defineCommand({
  meta: {
    version: pkg.version,
    name: "dev",
  },
  args: {
    cwd: {
      type: "positional",
      description: "directory osf working project",
      default: ".",
    },
  },
  async run({ args }) {
    if (!isAbsolute(args.cwd)) args.cwd = join(process.cwd(), args.cwd);

    const server = await createSvedocsServer(args.cwd);
    await server.listen();
    server.printUrls();
  },
});

createMain({
  meta: {
    version: pkg.version,
    name: "svedocs",
    description: "documentations for the rest of us",
  },
  subCommands: { dev },
})();
