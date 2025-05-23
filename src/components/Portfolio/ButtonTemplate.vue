<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
  buttonName: string
  color: string
  routerLink: string
  arrow_type: string
  arrow_right_side?: boolean
  arrow_left_side?: boolean
}>()

const button = ref<HTMLElement | null>(null)

onMounted(() => {
  if (button.value) {
    button.value.style.backgroundColor = props.color
  }
})

const MouseOver = ref<boolean>(false)

function enterHover() {
  MouseOver.value = true

  if (button.value) {
    button.value.style.backgroundColor = '#0F100F'
  }
}

function leaveHover() {
  MouseOver.value = false

  if (button.value) {
    button.value.style.backgroundColor = props.color
  }
}
</script>

<template>
  <div @mouseenter="enterHover" @mouseleave="leaveHover">
    <RouterLink :to="routerLink">
      <button type="button" ref="button" class="btn p-3 d-flex align-items-center">
        <font-awesome-icon
          v-if="arrow_left_side"
          class="me-1"
          v-show="MouseOver"
          :icon="['fas', `arrow-${arrow_type}`]"
        />

        <p class="m-0">
          {{ buttonName }}
        </p>

        <font-awesome-icon
          v-if="arrow_right_side"
          class="ms-1"
          v-show="MouseOver"
          :icon="['fas', `arrow-${arrow_type}`]"
        />
      </button>
    </RouterLink>
  </div>
</template>

<style scoped>
a,
RouterLink {
  text-decoration: none;
  color: white;
}

button {
  color: white;
  border-radius: 20px;
}

button:hover {
  border-radius: 0;
}
</style>
