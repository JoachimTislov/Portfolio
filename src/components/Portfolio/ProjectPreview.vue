<script setup lang="ts">
import { personalData } from '@/data/personal'
import ArrowLink from './ArrowLink.vue'
import ImagePreview from './ImagePreview.vue'
</script>

<template>
  <div class="mt-20 flex flex-col">
    <h2 class="p-2 text-center font-mono text-lg">Projects</h2>
    <div class="grid w-full grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        class="dark:bg-darkblue/50 mx-2 flex h-full flex-col rounded-lg bg-gray-400/60 p-4"
        v-for="(project, key) in personalData.projects"
        :key="key"
      >
        <h2 class="text-lg">{{ project.name }}</h2>
        <div class="mb-1 text-zinc-600 dark:text-zinc-500">
          <small> {{ project.date }} </small>
          <small v-if="project.group_size">
            · Group: {{ project.group_size }}
          </small>
          <small v-else> · Solo project </small>
        </div>
        <p class="mb-2">{{ project.intro }}</p>
        <div class="mt-auto">
          <ImagePreview class="w-full" :url="project.image" />
          <div class="flex gap-x-2">
            <ArrowLink
              name="About"
              class="flex-1 bg-blue-400 dark:bg-zinc-700"
              :to="`/about/${project.name}`"
            />
            <ArrowLink
              class="dark:bg-darkorange flex-1 bg-green-400"
              name="View project"
              :href="project.link"
              :to="project.page"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
