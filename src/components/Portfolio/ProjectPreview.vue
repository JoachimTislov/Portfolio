<script setup lang="ts">
import { personalData } from '@/data/personal'
import { ref } from 'vue'
import ArrowLink from './ArrowLink.vue'
const previewImage = ref<string | null>(null)
function openPreview(img: string) {
  previewImage.value = img
}
function closePreview() {
  previewImage.value = null
}
</script>

<template>
  <div class="flex flex-col">
    <h2 class="p-2 text-center font-mono text-lg">Projects</h2>
    <div class="flex flex-wrap gap-2">
      <div
        class="max-w-150 dark:bg-darkblue/50 rounded-lg p-4"
        v-for="(project, key) in personalData.projects"
        :key="key"
      >
        <h2 class="text-lg">{{ project.name }}</h2>
        <div class="dark:text-zinc-500">
          <small> {{ project.date }} </small>
          <small v-if="project.group_size">
            · Group: {{ project.group_size }}
          </small>
          <small v-else> · Solo project </small>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex flex-col gap-4">
            <p>{{ project.intro }}</p>
            <div class="mt-2 flex gap-x-2">
              <ArrowLink name="About" :to="`/about/${project.name}`" />
              <ArrowLink
                class="dark:bg-darkorange"
                name="View project"
                :href="project.link"
                :to="project.page"
              />
            </div>
          </div>
          <img
            :src="project.image"
            class="w-50 h-50 m-1 cursor-pointer rounded object-cover"
            @click="openPreview(project.image)"
          />
        </div>
      </div>
      <div
        v-if="previewImage"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
        @click="closePreview"
      >
        <img :src="previewImage" class="max-h-[120vh] max-w-6xl rounded" />
      </div>
    </div>
  </div>
</template>
