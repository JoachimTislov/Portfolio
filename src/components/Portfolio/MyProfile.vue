<script setup lang="ts">
import { personalData } from '@/data/personal'
import routes from '@/router/routes'
import TextIconLink from './TextIconLink.vue'
</script>

<template>
  <div class="mb-10 flex justify-center">
    <div
      class="max-w-100 dark:bg-darkblue flex flex-col rounded-2xl border bg-gray-400/90 px-2 pb-4 pt-5 shadow-2xl dark:border-gray-300/20"
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
        <div class="mt-2 flex justify-between gap-x-2">
          <TextIconLink
            name="Reach out"
            class="dark:bg-darkorange rounded-sm bg-green-500"
            :href="`mailto: ${personalData.email}`"
            iconLeftSide
          />
          <TextIconLink
            :name="routes.about.displayName"
            class="bg-blue-500 dark:bg-zinc-700"
            :to="routes.about.path"
          />
        </div>
      </div>
    </div>
  </div>
</template>
