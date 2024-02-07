import { createResolver } from "@nuxt/kit";
import { readFile, writeFile } from "fs/promises";
import prettier from "prettier";
import { globby } from "globby";
import { join, dirname } from "path";

const prettierConfig = await prettier.resolveConfig(".");

// converts `export { Toast, type ToastProps } from './toast' ...` to  ['Toast']
const findAllComponentExports = (fileContent?: string) => {
  if (!fileContent) return;

  const cleanedContent = fileContent.replace(/(\r\n|\n|\r)/gm, " ");
  const matches = cleanedContent.match(/export\s+{[^}]*}/gm);

  if (!matches) return;

  return matches.flatMap((line) =>
    line
      .replace(/export\s+{/, "")
      .replace(/}/, "")
      .split(",")
      .map((x) => x.trim())
      .filter((x) => !x.startsWith("type "))
      .filter((x) => /^[A-Z]\w*/.test(x))
      .map((x) => {
        const asREG = /.*as\s+([A-Z].*)/;
        const result = asREG.exec(x);
        return result?.[1] || x;
      }),
  );
};

async function main() {
  const { resolvePath } = createResolver(import.meta.url);
  const entrypoint = await resolvePath("@ark-ui/vue");

  const content = await readFile(entrypoint, "utf-8");
  const cleanedContent = content.replace(/(\r\n|\n|\r)/gm, " ");
  const matches =
    cleanedContent.match(/export\s+{([^}]*)}\sfrom\s'([^;]*)'/gm) || [];

  const components = await globby(dirname(entrypoint), {
    onlyDirectories: true,
    deep: 1,
  });
  console.log("components", components);

  const componentExportMap: Record<string, string[]> = Object.fromEntries(
    await Promise.all(
      matches.map(async (component) => {
        console.log("component", join(component, "index.mjs"));

        const fileContent = await readFile(join(component, "index.mjs"), {
          encoding: "utf8",
        }).catch(() => undefined);
        return [
          component.split("/").pop(),
          findAllComponentExports(fileContent),
        ];
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
