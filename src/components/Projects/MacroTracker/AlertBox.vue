<script setup lang="ts">

import { showAlert, alertMessage, alertClassName } from '@/Logic/MacroTracker/initVariables';

function hideAlert() { showAlert.value = false }

</script>

<template>

    <div v-if="showAlert" :class="alertClassName" class="mb-3 alert">

        <button type="button" class="btn btn-md btn-outline-light float-end" @click.prevent="hideAlert">
            Close <font-awesome-icon :icon="['fas', 'x']" />
        </button>

        <h4> <strong> {{ alertMessage }} </strong> </h4>

    </div>

</template>

<style scoped>
button {
    color: white
}

h4 {
    color: rgb(255, 221, 221);
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
}

div {
    position: -webkit-sticky;
    position: sticky;
    top: 5px;
    z-index: 1;
}
</style>