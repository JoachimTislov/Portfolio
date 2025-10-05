<script setup lang="ts">
import { personalData } from '@/data/personal'
import ProjectCard from './ProjectCard.vue'
import { icons } from '@/logic/Portfolio/icons'

const header = 'mt-2 p-2 text-center font-mono text-xl'
const grid = 'grid gap-y-4 gap-x-2 lg:grid-cols-2'
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h2 :class="header">Working on</h2>
    <font-awesome-icon :icon="icons.arrowDown" class="mb-2" />
    <div :class="grid">
      <ProjectCard
        v-for="(project, key) in personalData.projects.ongoing"
        :key="key"
        :project="project"
      />
    </div>
    <h3 :class="header">Archived Projects</h3>
    <font-awesome-icon :icon="icons.arrowDown" class="mb-2" />
    <div :class="grid">
      <RouterLink
        v-for="(project, key) in personalData.projects.archived"
        :key="key"
        :to="`about/${key}`"
      >
        <ProjectCard
          :project="project"
          class="hover:scale-102 cursor-pointer"
        />
      </RouterLink>
    </div>
  </div>
</template>
