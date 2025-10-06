<script setup lang="ts">
import TextIconLink from '@/components/Portfolio/TextIconLink.vue'
import ImagePreview from '@/components/Portfolio/ImagePreview.vue'
import RouterLinkFallback from '@/components/Portfolio/RouterLinkFallback.vue'
import type { Project } from '@/logic/Portfolio/types'
import { icons } from '@/logic/Portfolio/icons'
import { aboutProject } from '@/logic/Portfolio/functions'
import { computed } from 'vue'
const { project } = defineProps<{
  project?: Project
  id: string
}>()
const linkToAboutProject = computed(() => aboutProject(project))
</script>

<template>
  <RouterLinkFallback
    v-if="project"
    :condition="linkToAboutProject"
    :to="`/about/${id}`"
  >
    <div
      class="w-sm dark:bg-darkblue/50 h-full rounded-lg border bg-gray-400/60 p-4 shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-gray-300/20"
      :class="linkToAboutProject ? 'hover:scale-102 hover:cursor-pointer' : ''"
    >
      <div class="mb-1 flex flex-row justify-between">
        <div>
          <h2 class="text-lg">{{ project.name }}</h2>
          <div class="-mt-1 mb-1 text-zinc-600 dark:text-zinc-500">
            <small> {{ project.date }} </small>
            <small v-if="project.group_size">
              · Group: {{ project.group_size }}
            </small>
          </div>
        </div>
        <div>
          <a
            target="_blank"
            rel="noopener"
            :href="project.githubLink"
            @click.stop
          >
            <span
              class="dark:hover:text-darkorange transition-colors hover:text-blue-400"
            >
              <font-awesome-icon :icon="icons.github" class="mt-0.5 text-3xl" />
            </span>
          </a>
        </div>
      </div>
      <p class="mb-2 text-sm">{{ project.intro }}</p>
      <div class="mt-auto">
        <ImagePreview v-if="project.image" :url="project.image" />
        <div class="flex gap-x-2 text-sm">
          <TextIconLink
            class="dark:bg-darkorange flex-1 bg-green-400"
            name="View project"
            :href="project.link"
            :to="project.path"
            @click.stop
          />
        </div>
      </div>
    </div>
  </RouterLinkFallback>
</template>
