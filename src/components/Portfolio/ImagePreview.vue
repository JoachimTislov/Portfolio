<script setup lang="ts">
import { ref } from 'vue'
const previewImage = ref<string | null>(null)
function openPreview(img: string) {
  previewImage.value = img
}
function closePreview() {
  previewImage.value = null
}
defineProps<{
  url: string
}>()
</script>

<template>
  <div class="flex justify-center">
    <img
      :src="url"
      class="w-70 my-2 h-40 cursor-pointer rounded hover:opacity-60"
      @click="openPreview(url)"
    />
  </div>
  <div
    v-if="previewImage"
    class="fixed inset-0 z-50 flex items-center justify-center rounded-lg backdrop-blur-md"
    @click="closePreview"
  >
    <img
      :src="previewImage"
      class="m-1 h-full max-h-[80vh] w-full max-w-4xl rounded-lg object-contain"
    />
  </div>
</template>
