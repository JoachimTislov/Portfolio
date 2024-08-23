<script setup lang="ts">
import { personalData } from '@/Data/personal';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps<({
    buttonName: string
    color: string
    routerLink?: string
})>()

const button = ref<HTMLElement | null>(null)

onMounted(() => {
    button.value?.focus()

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
        <button ref="button" class="p-3">
            <RouterLink class="d-flex align-items-center" v-if="routerLink" :to="routerLink">
                <font-awesome-icon class="me-1" v-show="MouseOver" :icon="['fas', 'arrow-right']" />

                <p class="m-0">
                    <small> {{ buttonName }} </small>
                </p>
            </RouterLink>
            <a v-else class="d-flex align-items-center" :href="'mailto:' + personalData.email">
                <font-awesome-icon class="me-1" v-show="MouseOver" :icon="['fas', 'arrow-right']" />

                <p class="m-0">
                    <small> {{ buttonName }} </small>
                </p>
            </a>
        </button>
    </div>
</template>

<style scoped>
a,
RouterLink {
    text-decoration: none;
    color: white;
}

button {
    border-radius: 10px;
}

button:hover {
    border-radius: 0;
}
</style>