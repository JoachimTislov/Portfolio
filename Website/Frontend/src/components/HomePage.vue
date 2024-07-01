<script setup lang="ts">
import socialLinks from './socialLinks.vue'
import routerNavbar from './routerNavbar.vue'
</script>


<template>
    <div class="m-3 container-fluid">

        <div>
            <div class="imgDiv float-end"> <img src="./frontend/src/pictures/profile.png" alt="image"> </div>

            <div>
                <h1> Joachim Tisløv </h1>
                <socialLinks />
            </div>
        
        </div>
        
        <routerNavbar />
    </div>
</template>

<style scoped>

.imgDiv {

}

.imgDiv img {
    border-radius: 50%;

    width: 10vh;
    height: auto;
}


h1 {
    margin: 0;
}

</style>