<script setup lang="ts">
import type { iconDirection } from '@/logic/Portfolio/enums'
import { ref } from 'vue'
// Href will take precedence over to
defineProps<{
  name: string
  arrowDirection?: iconDirection
  arrowLeftSide?: boolean
  href?: string
  to?: string
}>()
const showArrow = ref(false)
</script>

<template>
  <component
    v-if="href || to"
    @mouseenter="showArrow = true"
    @mouseleave="showArrow = false"
    @touchstart="showArrow = true"
    @touchend="showArrow = false"
    @focus="showArrow = true"
    @blur="showArrow = false"
    :is="href ? 'a' : 'RouterLink'"
    :to
    :href
    class="text-md flex items-center p-2 font-mono hover:bg-gray-300/80 active:bg-gray-400/80 dark:hover:bg-zinc-900 dark:active:bg-zinc-800"
    :class="[
      arrowLeftSide ? 'flex-row-reverse' : '',
      to ? 'hover:cursor-pointer' : ''
    ]"
  >
    {{ name }}
    <font-awesome-icon
      :class="arrowLeftSide ? 'mr-1' : 'ml-1'"
      v-show="showArrow"
      :icon="['fas', `arrow-${arrowDirection ?? 'right'}`]"
    />
  </component>
</template>
