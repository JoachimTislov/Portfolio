<script setup lang="ts">
import socialLinks from './SocialLinks.vue'
import { personalData } from '@/data/personal'
import ButtonTemplate from './ButtonTemplate.vue'
</script>

<template>
  <div class="backdrop-blur-xl rounded-lg flex justify-evenly items-center mt-8 p-3">
    <div class="flex flex-col m-2 bg-[var(--profile-background-color)] shadow-lg p-3">
      <img class="mx-auto w-[clamp(10rem,15vw,20rem)] h-[clamp(10rem,15vw,20rem)] rounded-full" src="@/assets/images/joachim.png" />
      <h1 class="text-[clamp(2rem,3vw,3rem)] m-0">Hi, I'm {{ personalData.name }}</h1>
      <socialLinks />
    </div>

    <div class="flex flex-col justify-center items-center p-3 max-w-[330px] bg-[var(--profile-background-color)] shadow-lg">
      <div class="p-3 rounded bg-[#272b29] text-gray-400 border-4 border-secondary">
        <p>{{ personalData.intro }}</p>
      </div>

      <div class="mt-1 flex">
        <a class="mt-1 me-1 no-underline" :href="`mailto: ${personalData.email}`">
          <button type="button" class="btn p-3 flex items-center bg-[#130e0e] text-white hover:bg-[#241a1a]">
            <font-awesome-icon class="me-1 hidden group-hover:block" :icon="['fas', `arrow-right`]" />
            <p class="m-0">Contact</p>
          </button>
        </a>
        <ButtonTemplate
          class="mt-1 ms-1"
          buttonName="About Me"
          color="#222222"
          router-link="/more-of-me"
          :arrow_right_side="true"
          arrow_type="right"
        />
      </div>
    </div>
  </div>
</template>
