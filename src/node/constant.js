import { join } from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

/**
 * @type {{
 * version: number
 * }}
 */
export const pkg = JSON.parse(readFileSync("./package.json", "utf8"));

export const SOURCE_DIR = join(fileURLToPath(import.meta.url), "../../");
export const NODE_DIR = join(SOURCE_DIR, "./node");
export const CLIENT_DIR = join(SOURCE_DIR, "./client");

export const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div id="app"></div>
    <script type="module" src="/@fs/${CLIENT_DIR}/index.js"></script>
</body>
</html>`;
