const { compile } = require("@tailwindcss/node");
const { Scanner } = require("@tailwindcss/oxide");
const fs = require("fs");
const path = require("path");

async function buildCSS() {
  const rootDir = path.resolve(__dirname, "..");
  const inputPath = path.resolve(rootDir, "app/input.css");
  const outputPath = path.resolve(rootDir, "app/globals.css");

  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const rawCss = fs.readFileSync(inputPath, "utf8");
  const startTime = Date.now();

  const compiler = await compile(rawCss, {
    from: inputPath,
    base: rootDir,
    onDependency: () => {},
  });

  const scanner = new Scanner({
    sources: [
      { base: path.resolve(rootDir, "app"), pattern: "**/*.{ts,tsx,js,jsx}", negated: false },
      { base: path.resolve(rootDir, "components"), pattern: "**/*.{ts,tsx,js,jsx}", negated: false },
    ],
  });

  const candidates = scanner.scan();
  const compiledCss = compiler.build(candidates);

  fs.writeFileSync(outputPath, compiledCss, "utf8");
  console.log(`[Tailwind v4] Compiled ${outputPath} (${compiledCss.length} bytes in ${Date.now() - startTime}ms)`);
}

async function main() {
  await buildCSS();

  if (process.argv.includes("--watch") || process.argv.includes("-w")) {
    console.log("[Tailwind v4] Watching app/ and components/ for changes...");
    const rootDir = path.resolve(__dirname, "..");
    let debounceTimer = null;

    const watchDirs = [path.resolve(rootDir, "app"), path.resolve(rootDir, "components")];
    watchDirs.forEach((dir) => {
      if (fs.existsSync(dir)) {
        fs.watch(dir, { recursive: true }, (_eventType, filename) => {
          if (!filename || filename.endsWith("globals.css")) return;
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            console.log(`[Tailwind v4] File changed: ${filename}, recompiling...`);
            buildCSS().catch(console.error);
          }, 100);
        });
      }
    });
  }
}

main().catch((err) => {
  console.error("Error building CSS:", err);
  process.exit(1);
});
