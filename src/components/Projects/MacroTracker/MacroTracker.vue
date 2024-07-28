<script setup lang="ts">

import { RouterLink } from 'vue-router';

</script>

<template>

    <h1> Macro Tracker is coming, soon </h1>
    <nav class="navbar navbar-expand-md" data-bs-theme="dark">
    
        <ul class="navbar-nav me-auto"> 
            <li class="nav-item">
                <RouterLink class="nav-link" :to="{ name: 'macroLogin' }"> 
                    Login
                </RouterLink>
            </li> 

            <li class="nav-item">
                <RouterLink class="nav-link" :to="{ name: 'macroHome' }"> 
                    Home
                </RouterLink>
            </li> 
            
            <li class="nav-item">
                <RouterLink class="nav-link" :to="{ name: 'macroProfile' }"> 
                    Profile 
                </RouterLink>
            </li> 
        </ul>
    </nav>

</template>

<style scoped>



</style>