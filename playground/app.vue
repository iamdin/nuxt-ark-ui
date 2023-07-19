<script setup lang="ts">
import { type Ref, ref } from "vue";
import { css} from "styled-system/css";
import { styled } from "styled-system/jsx";
import { accordion } from "styled-system/recipes";
const val: Ref<string | string[]> = ref("Vue");
const items = ["Vue", "React", "Solid"];
</script>

<template>
  <div>
    <styled.button :pl="10">
      AAA
    </styled.button>
    <button
      :class="css({ textStyle: '5xl' })"
      @click="val = 'panel-3'"
    >
      Trigger
    </button>
    <div :class="css({ fontSize: 'xl' })">
      Hello 🐼!
    </div>
    <Accordion
      v-model="val"
      default-value="Vue"
      :class="accordion()"
    >
      <AccordionItem
        v-for="(item, id) in items"
        :key="id"
        :value="item"
      >
        <AccordionTrigger as-child>
          <button>
            <span>What is {{ item }}?</span>
            <!-- <AccordionIcon is-open="{isOpen}" /> -->
          </button>
        </AccordionTrigger>
        <AccordionContent>
          Pudding donut gummies chupa chups oat cake marzipan biscuit tart.
          Dessert macaroon ice cream bonbon jelly. Jelly topping tiramisu halvah
          lollipop.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>
