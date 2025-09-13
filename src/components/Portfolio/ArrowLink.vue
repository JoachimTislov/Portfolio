<script setup lang="ts">
import type { iconDirection } from '@/logic/Portfolio/enums'
import { ref } from 'vue'
// Href will take precedence over to
defineProps<{
  name: string
  arrowDirection?: iconDirection
  color?: string
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
    :is="href ? 'a' : 'RouterLink'"
    :to
    :href
    class="text-md flex items-center p-2 font-mono hover:bg-zinc-900"
    :class="[
      arrowLeftSide ? 'flex-row-reverse' : '',
      color ?? 'bg-zinc-700',
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
