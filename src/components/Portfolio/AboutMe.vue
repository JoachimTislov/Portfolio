<script setup lang="ts">
import { personalData } from '@/data/personal'
</script>

<template>
  <div class="dark:bg-darkblue w-90 mt-4 rounded-lg p-4">
    <h2 class="dark:bg-darkorange my-2 p-2">About Me</h2>
    <div class="mt-3">
      <p class="mt-2" v-for="paragraph in personalData.about" :key="paragraph">
        {{ paragraph }}
      </p>
      <div class="mt-2 p-2 dark:bg-zinc-900">
        <p>{{ personalData.university }}</p>
        <small class="italic">{{ personalData.degree }}</small>
      </div>
    </div>
  </div>
</template>
