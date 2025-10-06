<script setup lang="ts">
import MainNavbar from '@/components/MainNavbar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="m-1 mb-10 flex justify-center">
    <div class="flex flex-col">
      <MainNavbar />
      <div class="max-w-302 mt-5">
        <RouterView />
      </div>
    </div>
  </div>
</template>
