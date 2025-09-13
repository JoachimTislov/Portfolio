<script setup lang="ts">
import ArrowLink from './ArrowLink.vue'
import { personalData } from '@/data/personal'
import { useRoute } from 'vue-router'
const projectName = useRoute().params.project
const project = personalData.projects[projectName as string]
</script>

<template>
  <div v-if="!project" class="mt-4">
    <h2 class="font-mono text-xl">Project not found</h2>
  </div>
  <div v-else class="dark:bg-darkblue w-180 rounded-lg p-4">
    <div class="dark:bg-darkorange flex items-center justify-between p-2">
      <h1 class="pl-2 text-lg">{{ project.name }}</h1>
      <ArrowLink name="View project" :href="project.link" :to="project.page" />
    </div>
    <div class="mt-2 flex flex-col gap-3 p-1">
      <p v-for="paragraph in project.description" :key="paragraph">
        {{ paragraph }}
      </p>
      <div class="flex items-center justify-between gap-2">
        <div>
          <h2 class="mb-2 font-mono text-lg">Tech Stack</h2>
          <div class="flex flex-wrap gap-4">
            <a
              v-for="tool in project.tools"
              :href="tool.link"
              :key="tool.name"
              class="hover:bg-darkorange flex items-center gap-2 rounded bg-zinc-800 px-3 py-1 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span v-if="tool.icon">
                <font-awesome-icon :icon="tool.icon" class="text-xl" />
              </span>
              <span class="font-mono">{{ tool.name }}</span>
            </a>
          </div>
        </div>
        <img :src="project.image" class="h-40 w-40 rounded object-cover" />
      </div>
    </div>
  </div>
</template>
