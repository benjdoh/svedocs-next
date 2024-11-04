import { resolveRouter } from "./routes.js";

export async function resolveConfig(cwd = process.cwd()) {
  const router = await resolveRouter(cwd);

  return { router };
}
