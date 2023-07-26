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
