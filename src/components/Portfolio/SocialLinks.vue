<script setup lang="ts">
import { personalData } from '@/data/personal'
</script>

<template>
  <div class="d-flex flex-row">
    <a v-for="item in personalData.socialLinks" :key="item.link" :href="item.link" class="m-2">
      <font-awesome-icon :icon="item.icon" style="font-size: clamp(1.5rem, 2vw, 2rem)" />
    </a>
  </div>
</template>

<style scoped>
a {
  color: grey;
}

a:hover {
  color: darkgray;
}
</style>
