<script setup lang="ts">
import TextIconLink from '@/components/Portfolio/TextIconLink.vue'
import ImagePreview from '@/components/Portfolio/ImagePreview.vue'
import ProjectsGrid from '@/components/Portfolio/Project/ProjectsGrid.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { icons } from '@/logic/Portfolio/icons'
import { findProject, projectsWithAbout } from '@/logic/Portfolio/functions'
const route = useRoute()
const projectName = computed(() => route.params.project)
const project = computed(() => findProject(projectName.value))
</script>

<template>
  <div v-if="!project" class="mt-4">
    <div class="text-center font-mono text-xl">
      <h2 class="mb-2">Project: {{ projectName }} not found</h2>
      <h3>Select from list below</h3>
      <font-awesome-icon class="my-3 text-2xl" :icon="icons.arrowDown" />
    </div>
    <ProjectsGrid :projects="projectsWithAbout" />
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
        :to="project.path"
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
