<script setup lang="ts">
import ProjectCard from '@/components/Portfolio/Project/ProjectCard.vue'
import type { ProjectKey } from '@/logic/Portfolio/types'

defineProps<{
  projects: ProjectKey
}>()
</script>

<template>
  <div class="grid gap-x-2 gap-y-4 lg:grid-cols-2">
    <ProjectCard
      v-for="(project, key) in projects"
      :key="key"
      :project="project"
      :id="key as string"
    />
  </div>
</template>
