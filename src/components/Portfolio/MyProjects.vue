<script setup lang="ts">
import projectTemplate from './projectTemplate.vue'

import { CAccordion, CAccordionItem } from '@coreui/vue'

import { personalData } from '@/Data/personal'

const projects = personalData['projects']
</script>

<template>
  <div class="project_main d-flex flex-column justify-content-center">
    <CAccordion active-item-key="Image guesser" always-open flush>
      <CAccordionItem v-for="project in projects" :key="project.name" :item-key="project.name">
        <projectTemplate :project="project" />
      </CAccordionItem>
    </CAccordion>
  </div>
</template>

<style scoped>
.project_main {
  background-color: #3a3a3a;
  padding: 1%;
}
.accordion-item {
  border: 2px solid rgb(57, 55, 55);
}
</style>
