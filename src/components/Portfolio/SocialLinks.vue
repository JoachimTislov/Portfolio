<script setup lang="ts">
import { personalData } from '@/data/personal'
</script>

<template>
  <div
    class="flex max-w-60 items-center rounded-lg p-2 text-zinc-500 dark:bg-zinc-900"
  >
    <a
      v-for="item in personalData.socialLinks"
      :key="item.link"
      :href="item.link"
      class="m-1"
    >
      <span class="hover:text-darkorange transition-colors">
        <font-awesome-icon :icon="item.icon" class="text-3xl" />
      </span>
    </a>
  </div>
</template>
