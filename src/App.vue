<script setup lang="ts">
import { personalData } from '@/data/personal'
import { RouterView, useRoute } from 'vue-router'
import routes from '@/router/routes'
import ArrowLink from './components/Portfolio/ArrowLink.vue'
import { iconDirection } from './logic/Portfolio/enums'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'
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
</script>

<template>
  <div class="mb-10 flex justify-center">
    <div class="flex flex-col">
      <div
        class="mx-2 mt-3 flex h-10 items-center justify-center gap-x-5 lg:justify-between"
      >
        <ArrowLink
          v-if="useRoute().name !== routes.home.name"
          class="dark:bg-darkorange/80 me-auto rounded-sm bg-blue-400 px-3 font-mono"
          :name="routes.home.displayName"
          to="/"
          :arrow-direction="iconDirection.LEFT"
          arrow-left-side
        />
        <div
          class="ml-2 flex items-center rounded-lg bg-gray-300 p-1 text-zinc-500 dark:bg-zinc-900"
        >
          <a
            v-for="item in personalData.socialLinks"
            :key="item.link"
            :href="item.link"
            class="m-0.5"
          >
            <span
              class="dark:hover:text-darkorange transition-colors hover:text-blue-400"
            >
              <font-awesome-icon :icon="item.icon" class="text-3xl" />
            </span>
          </a>
        </div>
        <span
          class="dark:text-lightgray dark:hover:text-darkorange text-3xl text-gray-500 transition-colors hover:cursor-pointer hover:text-blue-400"
        >
          <font-awesome-icon
            @click="toggleTheme"
            :icon="darkMode ? faSun : faMoon"
          />
        </span>
      </div>
      <div class="max-w-302 mt-5">
        <RouterView />
      </div>
    </div>
  </div>
</template>
