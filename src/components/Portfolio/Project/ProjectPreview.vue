<script setup lang="ts">
import { personalData } from '@/data/personal'
import ProjectsGrid from '@/components/Portfolio/Project/ProjectsGrid.vue'
import HeaderIconText from '@/components/Portfolio/HeaderIconText.vue'
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <HeaderIconText headerText="Working on" />
    <ProjectsGrid :projects="personalData.projects.ongoing" />
    <HeaderIconText headerText="Archived Projects" />
    <ProjectsGrid :projects="personalData.projects.archived" />
  </div>
</template>
