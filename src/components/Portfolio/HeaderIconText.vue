<script setup lang="ts">
import { icons } from '@/logic/Portfolio/icons'
defineProps<{
  headerText: string
}>()
</script>

<template>
  <h3 class="mt-4 p-2 text-center font-mono text-xl">{{ headerText }}</h3>
  <font-awesome-icon :icon="icons.arrowDown" class="mb-2" />
</template>
