<script setup lang="ts">
import BackToHome from '@/components/Portfolio/BackButton.vue'
import FourInARow from '../../components/Projects/Four-in-a-row/FourInARow.vue'
import { onMounted } from 'vue'

onMounted(() => {
  localStorage.clear()
})
</script>

<template>
  <BackToHome />
  <FourInARow />
</template>
