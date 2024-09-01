<script setup lang="ts">
import { onMounted } from 'vue';
import MyProfile from '../../components/Portfolio/MyProfile.vue'
import ProjectFormat from '../../components/Portfolio/ProjectFormat.vue'
import { initiateExampleAccount } from '../../Logic/MacroTracker/initiateExampleAccount'
import { token } from '../../Logic/MacroTracker/variables'

onMounted(async () => {
  if (!token.value) {
    await initiateExampleAccount()

  }
})
</script>

<template>
  <MyProfile />
  <ProjectFormat />
</template>
