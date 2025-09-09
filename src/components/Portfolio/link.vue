<script setup lang="ts">
const props = defineProps<{
  routerLink?: string
  link?: string
}>()
</script>

<template>
  <RouterLink v-if="routerLink" :to="routerLink">
    <slot />
  </RouterLink>
  <a v-else-if="link" :href="props.link">
    <slot />
  </a>
</template>

<style scoped>
a,
RouterLink {
  text-decoration: none;
  color: white;
}
</style>
