<script setup lang="ts">
import SocialLinks from '@/components/Portfolio/SocialLinks.vue'
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
      <div class="mt-2 flex h-10 justify-center gap-x-5 lg:justify-between">
        <ArrowLink
          v-if="useRoute().name !== routes.home.name"
          class="dark:bg-darkorange/80 rounded-sm bg-blue-400 px-3 font-mono"
          :name="routes.home.displayName"
          to="/"
          :arrow-direction="iconDirection.LEFT"
          arrow-left-side
        />
        <SocialLinks />
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
