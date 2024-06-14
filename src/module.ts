import { addComponent, createResolver, defineNuxtModule } from "@nuxt/kit";
import * as fs from "node:fs";
import { dirname, join } from "path";

// Module options TypeScript interface definition
export interface ModuleOptions {
  prefix: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-ark-ui",
    configKey: "ark-ui",
    compatibility: {
      nuxt: ">=3.0.0",
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    prefix: "Ark",
  },
  async setup(options) {
    const resolver = createResolver(import.meta.url);

    const entrypoint = await resolver.resolvePath("@ark-ui/vue"); // node_modules/@ark-ui/vue/index.mjs
    const root = dirname(entrypoint); // node_modules/@ark-ui/vue

    // get export from index.mjs
    const content = fs.readFileSync(entrypoint, "utf-8");

    const cleanedContent = content.replace(/(\r\n|\n|\r)/gm, " ");
    const matches =
      cleanedContent.match(/export\s+{([^}]*)}\sfrom\s'([^;]*)'/gm) || [];

    for (const match of matches) {
      const [_, component, p] =
        match.match(/export\s+{\s+([^}]*)\s+}\s+from\s+'([^;]*)'/) || [];
      if (component && p) {
        if (/^[A-Z]\w*/.test(component)) {
          addComponent({
            name: `${options.prefix}${component}`,
            export: component,
            filePath: join(root, p),
          });
        }
      }
    }
  },
});
