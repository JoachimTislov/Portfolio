<script setup lang="ts">
import { personalData } from '@/data/personal'
import ArrowLink from './ArrowLink.vue'
import ImagePreview from './ImagePreview.vue'
</script>

<template>
  <div class="flex flex-col">
    <h2 class="p-2 text-center font-mono text-lg">Projects</h2>
    <div class="flex flex-wrap gap-2">
      <div
        class="max-w-150 dark:bg-darkblue/50 rounded-lg bg-gray-400/60 p-4"
        v-for="(project, key) in personalData.projects"
        :key="key"
      >
        <h2 class="text-lg">{{ project.name }}</h2>
        <div class="text-zinc-600 dark:text-zinc-500">
          <small> {{ project.date }} </small>
          <small v-if="project.group_size">
            · Group: {{ project.group_size }}
          </small>
          <small v-else> · Solo project </small>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex flex-col gap-4">
            <p>{{ project.intro }}</p>
            <div class="mt-2 flex gap-x-2">
              <ArrowLink
                name="About"
                class="bg-blue-400 dark:bg-zinc-700"
                :to="`/about/${project.name}`"
              />
              <ArrowLink
                class="dark:bg-darkorange bg-green-400"
                name="View project"
                :href="project.link"
                :to="project.page"
              />
            </div>
          </div>
          <ImagePreview :url="project.image" />
        </div>
      </div>
    </div>
  </div>
</template>
