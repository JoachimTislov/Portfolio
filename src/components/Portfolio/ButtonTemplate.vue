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




  <div>
    <button @mouseenter="enterHover" @mouseleave="leaveHover" type="button" ref="button">
      <RouterLink
        :to="routerLink"
        class="btn px-4 py-2 flex items-center text-white rounded-2xl transition-all duration-200 hover:rounded-none w-full sm:w-auto text-base sm:text-lg"
      >
        <font-awesome-icon
          v-if="arrow_left_side"
          class="mr-2"
          v-show="MouseOver"
          :icon="['fas', `arrow-${arrow_type}`]"
        />

        <p class="m-0 flex-1 text-center">
          {{ buttonName }}
        </p>

        <font-awesome-icon
          v-if="arrow_right_side"
          class="ml-2"
          v-show="MouseOver"
          :icon="['fas', `arrow-${arrow_type}`]"
        />
      </RouterLink>
    </button>
  </div>
</template>
