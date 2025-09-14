<script setup lang="ts">
import { personalData } from '@/data/personal'
</script>

<template>
  <div
    class="flex items-center rounded-lg bg-gray-300 p-2 text-zinc-500 dark:bg-zinc-900"
  >
    <a
      v-for="item in personalData.socialLinks"
      :key="item.link"
      :href="item.link"
      class="m-1"
    >
      <span
        class="dark:hover:text-darkorange transition-colors hover:text-blue-400"
      >
        <font-awesome-icon :icon="item.icon" class="text-3xl" />
      </span>
    </a>
  </div>
</template>
