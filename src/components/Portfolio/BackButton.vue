<script setup lang="ts">
import router from '@/router';
</script>

<template>

    <div class="d-flex mt-3">

        <button type="button" class="btn btn-secondary" @click="router.back()">
            <font-awesome-icon class="me-1" :icon="['fas', 'arrow-left']" />
            Back
        </button>

        <button type="button" class="ms-2 btn btn-secondary" @click="router.push({ name: 'home' })">
            Return home
        </button>
    </div>

</template>
