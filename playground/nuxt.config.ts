import { createResolver } from "@nuxt/kit";
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  modules: ["../src/module", '@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
});
