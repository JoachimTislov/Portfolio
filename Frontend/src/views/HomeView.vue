<script setup lang="ts">
import HomePage from '../components/HomePage.vue'
</script>

<template>
  <div class="container">
    <HomePage />
  </div>
</template>


<style scoped>

.container {
  margin-bottom: 10%;
}


@media (min-width: 700px) {
  
  .container {
    width: 80%;
  }
  
}

</style>
