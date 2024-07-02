<script setup lang="ts">
import socialLinks from './socialLinks.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="box container-fluid mt-5">
        <div class="secondBox justify-content-center d-flex flex-row p-3"> 
            <div class="info d-flex flex-column">
                <h1 class="mb-0"> Joachim Tisløv </h1>
                <socialLinks class="socialLinks" />

                <figure>
                    <blockquote class="blockquote">
                      <p class="mb-0">“A good programmer is someone who always looks both ways before crossing a one-way street.”</p>
                    </blockquote>
                    
                    <p class="cite">- Doug Linder, computer scientist</p>
                </figure>
            </div>

            <div class="imgDiv"> <img src="/joachim.png" alt="image"> </div>
        </div>
    </div>

    <div class="content">
        
        <div class="pt-2 d-flex justify-content-around">
          <RouterLink class="link" to="/"> About Me </RouterLink> 
          <RouterLink class="link" to="/projects"> Projects </RouterLink>
        </div>
  
        <RouterView />
    </div>
</template>

<style scoped>

.info {
    width: 55%;
}

.cite {
    margin: 0;
    margin-left: 1vw;
    font-size: 1.8vw;
    color: grey;
}

blockquote {
    margin-bottom: 0;
}

p {
    font-size: 2vw
}

.socialLinks {
    margin-top: -1.5vh;
}

.box {
    background-color: #232931;
    border-radius: 30px;

    box-shadow: 0 0 8px 8px rgba(0, 0, 0, 0.5), 0 0 0 0 rgba(0, 0, 0, 0.5);
}

h1 {
    margin: 0;
    font-size: 4.5vw;
}

.imgDiv {
    width: 20vw;
    height: 20vw;
    overflow: hidden;
    margin-left: 3vw;
    border-radius: 50%;

    background-color: white;
}

img {
    width: 100%;
    height: auto;

    object-fit: cover;
}

.link {
    text-decoration: none;
    color: darkgrey;

    margin-top: 0.1em;

    font-size: 3vw;
}

.link:hover {
    color: #3A3A3A;
}

.content {
    background-color: #1A1916;

    border-radius: 15px;
    margin-top: 3%;
    box-shadow: 0 1px 8px 4px rgba(0, 0, 0, 0.5), 0 0 0 0 rgba(0, 0, 0, 0.5);
}
  
</style>