<script setup lang="ts">
import { personalData } from '@/Data/personal'

const links = personalData['socialLinks']
</script>

<template>
  <div class="d-flex flex-row">
    <a v-for="item in links" :key="item.img" :href="item.link"
      ><img class="socialLink m-1" :src="item.img"
    /></a>
  </div>
</template>

<style scoped>
.socialLink {
  width: clamp(2.5rem, 3.5vw, 4rem);
}
</style>
