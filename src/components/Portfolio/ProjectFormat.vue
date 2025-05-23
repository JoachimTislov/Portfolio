<script setup lang="ts">
import { personalData } from '../../Data/personal'
import ButtonTemplate from './ButtonTemplate.vue'
import { projectToShow } from '@/Logic/Portfolio/variables'
import { viewName } from '@/Logic/Portfolio/functions'
import type { Project } from '@/Logic/Portfolio/types'

function assignChosenProject(project: Project) {
  for (const [key, value] of Object.entries(project)) {
    projectToShow[key] = value
  }
}
</script>

<template>
  <div class="projectsContainer mt-4 pb-4">
    <h2 class="p-2">Projects</h2>
    <div class="card m-2 mt-3" v-for="(project, key) in personalData.projects" :key="key">
      <div class="card-header d-flex">
        <div class="flex-column">
          <h3 class="card-title m-0">{{ project.name }}</h3>
          <div class="ms-1">
            <small style="color: darkgrey"> {{ project.date }} </small>
            <br />
            <small v-if="project.group_size"> Group size: {{ project.group_size }} </small>
            <small v-else> -> Solo project </small>
            <small v-if="project.original">, original version </small>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="d-flex bodyBox">
          <div class="p-3 m-2 rounded border border-3 border-secondary">
            <p>{{ project.intro }}</p>
          </div>

          <img :src="project.image" class="m-2 mt-3" />
        </div>

        <div class="ms-auto d-flex mt-2">
          <ButtonTemplate
            @click="assignChosenProject(project)"
            class="me-2"
            buttonName="About"
            color="#222222"
            :arrow_left_side="true"
            arrow_type="right"
            router-link="/about-project"
          />
          <ButtonTemplate
            v-if="project.viewProjectLink"
            :arrow_right_side="true"
            :buttonName="viewName(project)"
            arrow_type="right"
            color="#171717"
            :router-link="project.viewProjectLink"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projectsContainer {
  background-color: var(--profile-background-color);
  box-shadow:
    0 0 8px 8px rgba(0, 0, 0, 0.5),
    0 0 0 0 rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.bodyBox {
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
}

img {
  width: 60%;
}

@media (max-width: 990px) {
  .bodyBox {
    justify-content: center;
    flex-direction: column;
  }

  img {
    width: 90%;
  }
}
</style>
