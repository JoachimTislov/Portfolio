<script setup lang="ts">
import { RouterView } from 'vue-router'

import navbarView from './views/navbarView.vue'

</script>

<template>
  <main>

    <navbarView />
    
    <div class="container mb-5">
      <RouterView />
    </div>

  </main>
</template>



