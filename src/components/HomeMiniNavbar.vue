
<script setup lang="ts">

import { RouterLink } from 'vue-router';

</script>


<template>

    <div class="p-2 d-flex justify-content-around">
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

    font-size: clamp(1.2rem, 3vw, 2.5rem);
}

.link:hover {
    color: grey;
}


</style>