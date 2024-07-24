<script setup lang="ts">
import { RouterView } from 'vue-router'

import HomeMiniNavbar from './HomeMiniNavbar.vue'
import contactMe from './contactMe.vue';

import myProfile from './myProfile.vue';
</script>

<template> 

    <myProfile />

    <div class="content">
        <HomeMiniNavbar />

        <RouterView />

        <contactMe />
    </div>

</template>

<style scoped>

.content {
    background-color: #1A1916;

    border-radius: 15px;
    margin-top: 3%;
    box-shadow: 0 1px 8px 4px rgba(0, 0, 0, 0.5), 0 0 0 0 rgba(0, 0, 0, 0.5);
}

</style>