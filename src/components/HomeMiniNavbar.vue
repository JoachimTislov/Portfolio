
<script setup lang="ts">

import { RouterLink } from 'vue-router';

</script>


<template>

    <div class="pt-1 pb-2 d-flex justify-content-around">
        <RouterLink class="link" to="/"> 
            Regarding me  
        </RouterLink>
        <RouterLink class="link" to="projects"> 
            Projects 
        </RouterLink>
    </div>

</template>


<style scoped>


.link {
    text-decoration: none;

    color: white;

    padding: 0.5rem;

    font-size: clamp(1.5rem, 3vw, 2.5rem);
}

.link:hover {
    color: grey;
}


</style>