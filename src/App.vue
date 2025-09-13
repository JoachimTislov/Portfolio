<script setup lang="ts">
import SocialLinks from '@/components/Portfolio/SocialLinks.vue'
import { RouterView, useRoute } from 'vue-router'
import routes from '@/router/routes'
import ArrowLink from './components/Portfolio/ArrowLink.vue'
import { iconDirection } from './logic/Portfolio/enums'
</script>

<template>
  <div class="flex justify-center">
    <div class="flex flex-col">
      <div class="mt-2 flex h-10 gap-x-5">
        <SocialLinks />
        <ArrowLink
          v-if="useRoute().name !== routes.home.name"
          class="rounded-lg font-mono"
          color="dark:bg-darkorange"
          :name="routes.home.displayName"
          to="/"
          :arrow-direction="iconDirection.LEFT"
          arrow-left-side
        />
      </div>
      <div class="max-w-302 mt-5">
        <RouterView />
      </div>
    </div>
  </div>
</template>
