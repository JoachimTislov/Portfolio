<script setup lang="ts">
import { personalData } from '@/data/personal'
import ArrowLink from './ArrowLink.vue'
import ImagePreview from './ImagePreview.vue'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
</script>

<template>
  <div class="flex flex-col">
    <h2 class="mb-5 p-2 text-center font-mono text-xl">Projects</h2>
    <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="(project, key) in personalData.projects"
        :key="key"
        :to="`about/${key}`"
        class="hover:cursor-pointer"
      >
        <div
          class="dark:bg-darkblue/50 hover:scale-101 mx-2 h-full rounded-lg border border-gray-300/20 bg-gray-400/60 p-4 shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <div class="mb-1 flex flex-row items-center justify-between">
            <div>
              <h2 class="-mb-2 text-lg">{{ project.name }}</h2>
              <div class="mb-1 text-zinc-600 dark:text-zinc-500">
                <small> {{ project.date }} </small>
                <small v-if="project.group_size">
                  · Group: {{ project.group_size }}
                </small>
                <small v-else> · Solo project </small>
              </div>
            </div>
            <a
              target="_blank"
              rel="noopener"
              :href="project.githubLink"
              @click.stop
            >
              <span
                class="dark:hover:text-darkorange transition-colors hover:text-blue-400"
              >
                <font-awesome-icon :icon="faGithub" class="text-3xl" />
              </span>
            </a>
          </div>
          <p class="mb-2 text-sm">{{ project.intro }}</p>
          <div class="mt-auto">
            <ImagePreview v-if="project.image" :url="project.image" />
            <div class="flex gap-x-2 text-sm">
              <ArrowLink
                class="dark:bg-darkorange flex-1 bg-green-400"
                name="View project"
                :href="project.link"
                :to="project.page"
                @click.stop
              />
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
