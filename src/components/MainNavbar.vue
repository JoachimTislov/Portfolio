<script setup lang="ts">
import { personalData } from '@/data/personal'
import { useRoute } from 'vue-router'
import routes from '@/router/routes'
import TextIconLink from '@/components/Portfolio/TextIconLink.vue'
import { ref } from 'vue'
import { icons } from '@/logic/Portfolio/icons'
const darkMode = ref(
  localStorage.getItem('darkMode') !== null ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
)
function toggleTheme() {
  if (darkMode.value) {
    document.documentElement.classList.remove('dark')
    localStorage.removeItem('darkMode')
  } else {
    localStorage.setItem('darkMode', 'enabled')
    document.documentElement.classList.add('dark')
  }
  darkMode.value = !darkMode.value
}
const rightIconStyle =
  'dark:text-lightgray dark:hover:text-darkorange text-3xl text-gray-500 transition-colors hover:cursor-pointer hover:text-blue-400'
</script>

<template>
  <div
    class="mt-3 flex h-10 items-center justify-center gap-x-5 lg:justify-between"
  >
    <TextIconLink
      v-if="useRoute().name !== routes.home.name"
      class="dark:bg-darkorange/80 me-auto rounded-sm bg-blue-400 px-3 font-mono"
      :name="routes.home.displayName"
      to="/"
      :icon="icons.arrowLeft"
      iconLeftSide
    />
    <div
      class="flex items-center rounded-md border bg-gray-300 p-1 text-zinc-500 dark:bg-zinc-900"
    >
      <a
        v-for="item in personalData.socialLinks"
        :key="item.link"
        :href="item.link"
        class="m-0.5"
        target="_blank"
        rel="noopener"
      >
        <span
          class="dark:hover:text-darkorange transition-colors hover:text-blue-400"
        >
          <font-awesome-icon :icon="item.icon" class="text-3xl" />
        </span>
      </a>
    </div>
    <div
      class="border-darkorange flex items-center gap-x-2 rounded-sm border-2 bg-gray-300 p-1 text-zinc-500 dark:bg-zinc-900"
    >
      <a :href="personalData.sourceCode" target="_blank" rel="noopener">
        <span :class="rightIconStyle">
          <font-awesome-icon :icon="icons.github" />
        </span>
      </a>
      <span :class="rightIconStyle">
        <font-awesome-icon
          @click="toggleTheme"
          :icon="darkMode ? icons.sun : icons.moon"
        />
      </span>
    </div>
  </div>
</template>
