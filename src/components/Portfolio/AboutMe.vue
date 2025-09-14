<script setup lang="ts">
import { personalData } from '@/data/personal'
</script>

<template>
  <div class="dark:bg-darkblue sm:w-140 mt-4 rounded-lg bg-gray-300 p-4">
    <h2 class="dark:bg-darkorange mb-4 mt-2 bg-green-300/80 p-2">About Me</h2>
    <p
      class="mx-2 mt-2"
      v-for="paragraph in personalData.about"
      :key="paragraph"
    >
      {{ paragraph }}
    </p>
    <div class="mt-2 p-2 dark:bg-zinc-900">
      <p>{{ personalData.university }}</p>
      <small class="italic">{{ personalData.degree }}</small>
    </div>
  </div>
</template>
