<script setup lang="ts">
import { icons } from '@/logic/Portfolio/icons'
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'
// Href will take precedence over to
defineProps<{
  name: string
  icon?: IconDefinition
  iconLeftSide?: boolean
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
    @focus="showArrow = true"
    @blur="showArrow = false"
    :is="href ? 'a' : 'RouterLink'"
    :to
    :href
    class="text-md flex items-center rounded-sm p-2 font-mono hover:bg-gray-300/80 active:bg-gray-400/80 dark:hover:bg-zinc-900 dark:active:bg-zinc-800"
    :class="[
      iconLeftSide ? 'flex-row-reverse' : '',
      to ? 'hover:cursor-pointer' : ''
    ]"
    v-bind="href ? { target: '_blank', rel: 'noopener' } : {}"
  >
    {{ name }}
    <font-awesome-icon
      :class="iconLeftSide ? 'mr-1' : 'ml-1'"
      v-show="showArrow"
      :icon="icon ?? icons.arrowRight"
    />
  </component>
</template>
