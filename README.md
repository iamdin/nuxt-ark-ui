<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: Ark UI
- Package name: nuxt-ark-ui
- Description: My new Nuxt module
-->

# Nuxt Ark UI

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Ark UI integration for Nuxt. Get fully customizable, accessible and unstyled UI components

Ark UI documentation for Vue: https://ark-ui.com/docs/vue/overview/introduction

<!-- - [✨ &nbsp;Release Notes](/CHANGELOG.md) -->
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-ark-ui?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->

- ⛰ &nbsp;Automatic dynamic imports (no global components)
- 🚠 &nbsp;Fully type safe
- 🌲 &nbsp;Configurable component prefix (defaults to Ark)

## Quick Setup

1. Add `nuxt-ark-ui` dependency to your project

```bash
npx nuxi@latest module add ark-ui
```

2. Add `nuxt-ark-ui` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["nuxt-ark-ui"],
});
```

That's it! You can now use Ark UI in your Nuxt app without import the components ✨

## Usage

```vue
<template>
  <div class="container mx-auto flex justify-center">
    <div class="w-full max-w-md px-2 py-16 sm:px-0">
      <ArkTabs v-slot="{ selectedValue }" default-value="Popular">
        <ArkTabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <ArkTabTrigger
            v-for="category in Object.keys(categories)"
            :key="category"
            :value="category"
          >
            <button
              :class="[
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selectedValue === category
                  ? 'bg-white shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
              ]"
            >
              {{ category }}
            </button>
          </ArkTabTrigger>
        </ArkTabList>
        <div class="mt-2">
          <ArkTabContent
            v-for="([key, posts], idx) in Object.entries(categories)"
            :key="idx"
            :value="key"
            :class="[
              'rounded-xl bg-white p-3',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            ]"
          >
            <ul>
              <li
                v-for="post in posts"
                :key="post.id"
                class="relative rounded-md p-3 hover:bg-gray-100"
              >
                <h3 class="text-sm font-medium leading-5">
                  {{ post.title }}
                </h3>

                <ul
                  class="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500"
                >
                  <li>{{ post.date }}</li>
                  <li>&middot;</li>
                  <li>{{ post.commentCount }} comments</li>
                  <li>&middot;</li>
                  <li>{{ post.shareCount }} shares</li>
                </ul>
                <a
                  href="#"
                  :class="[
                    'absolute inset-0 rounded-md',
                    'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2',
                  ]"
                />
              </li>
            </ul>
          </ArkTabContent>
        </div>
      </ArkTabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const categories = ref({
  Recent: [
    {
      id: 1,
      title: "Does drinking coffee make you smarter?",
      date: "5h ago",
      commentCount: 5,
      shareCount: 2,
    },
  ],
  Popular: [
    {
      id: 1,
      title: "Is tech making coffee better or worse?",
      date: "Jan 7",
      commentCount: 29,
      shareCount: 16,
    },
  ],
  Trending: [
    {
      id: 1,
      title: "Ask Me Anything: 10 answers to your questions about coffee",
      date: "2d ago",
      commentCount: 9,
      shareCount: 5,
    },
  ],
});
</script>
```

## Options

### prefix

- Type: `string`
- Default: `Ark`

Components prefix

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-ark-ui/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-ark-ui
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-ark-ui.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-ark-ui
[license-src]: https://img.shields.io/npm/l/nuxt-ark-ui.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-ark-ui
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
