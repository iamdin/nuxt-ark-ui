import {
  defineNuxtModule,
  createResolver,
  addComponent,
} from "@nuxt/kit";
import ArkComponents from "./components";
import { dirname, join } from "path";

// Module options TypeScript interface definition
export interface ModuleOptions {
  prefix: string;
}

const objectKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>;
};

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-ark-ui",
    configKey: "ark-ui",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    prefix: "Ark",
  },
  async setup(options) {
    const resolver  = createResolver(import.meta.url);

    const entrypoint = await resolver.resolvePath("@ark-ui/vue"); // node_modules/@ark-ui/vue/index.mjs
    const root = dirname(entrypoint); // node_modules/@ark-ui/vue

    for (const key of objectKeys(ArkComponents)) {
      for (const component of ArkComponents[key]) {
        addComponent({
          name: `${options.prefix}${component}`,
          export: component,
          filePath: join(root, key),
          // chunkName: group.chunkName,
          // mode: 'all'
        });
      }
    }
  },
});
