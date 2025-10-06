<script setup lang="ts">
import { RouterLink } from 'vue-router'
defineProps<{
  condition: boolean
  to: string
}>()
</script>

<template>
  <RouterLink v-if="condition" :to>
    <slot />
  </RouterLink>
  <div v-else>
    <slot />
  </div>
</template>
