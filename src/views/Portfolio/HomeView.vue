<script setup lang="ts">
import { onMounted } from 'vue';
import MyProfile from '../../components/Portfolio/MyProfile.vue'
import ProjectFormat from '../../components/Portfolio/ProjectFormat.vue'
import { initiateExampleAccount } from '../../Logic/MacroTracker/initiateExampleAccount'

onMounted(async () => {
  initiateExampleAccount()
})
</script>

<template>
  <MyProfile />
  <ProjectFormat />
</template>
