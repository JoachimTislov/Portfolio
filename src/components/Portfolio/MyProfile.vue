<script setup lang="ts">
import { personalData } from '@/data/personal'
import routes from '@/router/routes'
import ArrowLink from './ArrowLink.vue'
</script>

<template>
  <div class="flex">
    <div
      class="max-w-100 dark:bg-darkblue flex flex-col rounded-2xl bg-gray-400/90 px-2 pb-4 pt-5"
    >
      <img class="mx-auto h-60 w-60 rounded-full" :src="personalData.picture" />
      <div class="mx-5 mt-2 flex flex-col text-pretty">
        <h1 class="text-3xl">Hi, I'm {{ personalData.name }}</h1>
        <h2 class="text-md font-mono">
          {{ personalData.role }} from {{ personalData.country }}
        </h2>
        <small class="font-mono">
          {{ personalData.os }} & {{ personalData.ide }} enthusiast</small
        >
        <div class="mt-2 flex gap-x-2">
          <ArrowLink
            name="Reach out"
            class="dark:bg-darkorange bg-green-600"
            :href="`mailto: ${personalData.email}`"
            arrow-left-side
          />
          <ArrowLink
            :name="routes.about.displayName"
            class="bg-blue-500 dark:bg-zinc-700"
            :to="routes.about.path"
          />
        </div>
      </div>
    </div>
  </div>
</template>
