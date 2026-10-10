// @vitest-environment node
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

import { build } from "vite";
import { beforeAll, describe, expect, it } from "vitest";

const root = fileURLToPath(new URL("../..", import.meta.url));

const countOccurrences = (text, search) => text.split(search).length - 1;

const readSourceFiles = () =>
  readdirSync(join(root, "src"), { recursive: true })
    .filter((file) => /\.jsx?$/.test(file) && !/__(tests|mocks)__/.test(file))
    .map((file) => readFileSync(join(root, "src", file), "utf8"))
    .join("\n");

describe("library build", () => {
  let code;

  beforeAll(async () => {
    const [output] = await build({
      root,
      configFile: join(root, "vite.lib.config.js"),
      logLevel: "silent",
      build: { write: false },
    });
    code = output.output
      .filter((chunk) => chunk.type === "chunk")
      .map((chunk) => chunk.code)
      .join("\n");
  }, 30000);

  it("leaves the router basename for the site's own Vite build", () => {
    expect(code).toContain('basename: import.meta.env?.BASE_URL ?? "/"');
    expect(code).not.toContain('basename: "/"');
  });

  it("keeps every BASE_URL read instead of baking in the library's base", () => {
    const sourceReads = countOccurrences(
      readSourceFiles(),
      "import.meta.env.BASE_URL"
    );

    expect(sourceReads).toBeGreaterThan(0);
    expect(countOccurrences(code, 'import.meta.env?.BASE_URL ?? "/"')).toBe(
      sourceReads
    );
  });
});
