<script setup lang="ts">
import TextIconLink from './TextIconLink.vue'
import ImagePreview from './ImagePreview.vue'
import ProjectPreview from './ProjectPreview.vue'
import { personalData } from '@/data/personal'
import { useRoute } from 'vue-router'
const projectName = useRoute().params.project
const project = personalData.projects.archived[projectName as string]
</script>

<template>
  <div v-if="!project" class="mt-4">
    <div class="text-center font-mono text-xl">
      <h2 class="mb-2">Project: {{ projectName }} not found</h2>
      <h3>Select from the list below</h3>
      <font-awesome-icon class="mt-5 text-3xl" :icon="['fas', 'arrow-down']" />
    </div>
    <ProjectPreview />
  </div>
  <div v-else class="dark:bg-darkblue md:w-180 rounded-lg bg-gray-300 p-4">
    <div
      class="dark:bg-darkorange flex items-center justify-between bg-green-300/80 p-2"
    >
      <h1 class="pl-2 text-lg">{{ project.name }}</h1>
      <TextIconLink
        name="View project"
        class="bg-blue-400/70 dark:bg-zinc-700"
        :href="project.link"
        :to="project.page"
      />
    </div>
    <div class="mt-2 flex flex-col gap-3 p-1">
      <p v-for="paragraph in project.description" :key="paragraph">
        {{ paragraph }}
      </p>
      <div class="flex flex-col items-center lg:flex-row">
        <div>
          <h2 class="mb-2 font-mono text-lg">Tech Stack</h2>
          <div class="mr-2 flex flex-wrap gap-3">
            <a
              v-for="tool in project.tools"
              :href="tool.link"
              :key="tool.name"
              class="dark:hover:bg-darkorange flex items-center rounded bg-green-200 px-3 py-2 transition-all duration-200 hover:scale-105 hover:bg-blue-400 hover:text-zinc-300 dark:bg-zinc-800 dark:text-zinc-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <font-awesome-icon
                v-if="tool.icon"
                :icon="tool.icon"
                class="mr-2 text-xl"
              />
              <span class="font-mono dark:text-zinc-300">{{ tool.name }}</span>
            </a>
          </div>
        </div>
        <ImagePreview v-if="project.image" :url="project.image" />
      </div>
    </div>
  </div>
</template>
