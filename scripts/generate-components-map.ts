import { createResolver } from "@nuxt/kit";
import { readFile, writeFile } from "fs/promises";
import prettier from "prettier";
import { globby } from "globby";
import { join, dirname } from "path";

const prettierConfig = await prettier.resolveConfig(".");

function extractComponentExports(fileContent?: string) {
  return fileContent?.match(/(?<=export\s{).*(?=})/gm)?.flatMap((line) =>
    line
      .split(",")
      .map((x) => x.trim())
      .filter((x) => /^[A-Z]/.test(x)),
  );
}

async function main() {
  const { resolvePath } = createResolver(import.meta.url);
  const entrypoint = await resolvePath("@ark-ui/vue");

  const components = await globby(dirname(entrypoint), {
    onlyDirectories: true,
    deep: 1,
  });
  const componentExportMap: Record<string, string[]> = Object.fromEntries(
    await Promise.all(
      components.map(async (component) => {
        const fileContent = await readFile(join(component, "index.mjs"), {
          encoding: "utf8",
        }).catch(() => undefined);
        return [component.split("/").pop(), extractComponentExports(fileContent)];
      }),
    ),
  );

  await writeFile(
    "./src/components.ts",
    await prettier.format(
      `export default ${JSON.stringify(componentExportMap, null, 2)}
      `,
      {
        ...prettierConfig,
        parser: "typescript",
      },
    ),
  );

  console.log("componentExportMap", componentExportMap);
}

main().catch((err) => {
  const error = new Error(err);
  console.error(error.stack);
  process.exit(1);
});
