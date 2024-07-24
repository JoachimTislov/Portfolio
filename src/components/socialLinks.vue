<script setup lang="ts">

import { personalData } from '@/Data/personal';

const links = personalData['socialLinks']

</script>

<template>
  <div class="d-flex flex-row">
    <a v-for="item in links" :key="item.img" :href="item.link"><img class="socialLink" :src="item.img" /></a>
  </div>
</template>

<style scoped>
.socialLink {
  width: clamp(2rem, 3.5vw, 4rem);
}

.gmail {
  margin-top: -0.3em;
  width: 3.4vw;
}

a {
  margin-left: 2%;
}

</style>
