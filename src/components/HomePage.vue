<script setup lang="ts">
import socialLinks from './socialLinks.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="box mt-4">
        <div class="secondBox justify-content-center d-flex flex-row p-3"> 
            <div class="info d-flex flex-column">
                <h1 class="m-0"> Joachim Tisløv </h1>
                <socialLinks class="socialLinks" />

                <figure>
                    <blockquote class="blockquote">
                      <p class="mb-0">“A good programmer is someone who always looks both ways before crossing a one-way street.”</p>
                    </blockquote>
                    
                    <p class="cite">- Doug Linder, computer scientist</p>
                </figure> 
            </div> 

            <div class="imgDiv"> <img src="@\\assets\\images\\joachim.png" alt="image"> </div>
        </div>
    </div>

    <div class="content">
        
        <div class="pt-1 pb-2 d-flex justify-content-around">
          <RouterLink class="link" to="/"> Regarding me </RouterLink>
          <RouterLink class="link" to="projects"> Projects </RouterLink>
        </div>

        <RouterView />

        <div class="d-flex justify-content-around">
            <p class="contact"> 
                Please contact at joachim.tislov@gmail.com 

                <font-awesome-icon class="arrow" :icon="['fas', 'arrow-right']" />

                <a href="mailto:Joachim.tislov@gmail.com"><img class="gmail" src="@\\assets\\images\\gmail.png" /></a>

            </p>
        </div>
  
    </div>
</template>

<style scoped>

.arrow {
    margin-right : 0.4em;
}

.gmail {
    margin-top: -5px;

    width: 2em;
    height: auto;
}

.info {
    width: 55%;
    margin-top: 1%;
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

figure p {
    font-size: 1.5vw
}

.socialLinks {
    margin-top: -6px;
}

.box {
    background-color: #232931;
    border-radius: 30px;

    box-shadow: 0 0 8px 8px rgba(0, 0, 0, 0.5), 0 0 0 0 rgba(0, 0, 0, 0.5);
}

h1 {
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

.link, .contact {
    text-decoration: none;
    color: rgb(216, 189, 189);

    margin-top: 3%;

    font-size: 2.5vw;
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

@media (min-width: 1000px) {

.link, .contact {
    font-size: 1.5vw;
}

.imgDiv {
    width: 15vw;
    height: 15vw;
}

h1 {
    font-size: 3.5vw;
}

figure p {
    font-size: 1.3vw;
}

.cite {
    font-size: 1vw;
}
}


@media (min-width: 600px) and (max-width: 1000px) {

    .link, .contact {
        font-size: 1.5vw;
    }

    .imgDiv {
        width: 25vw;
        height: 25vw;
    }

    h1 {
        font-size: 4.5vw;
    }

    figure p {
        font-size: 2vw;
    }

    .cite {
        font-size: 2vw;
    }
}


@media (max-width: 600px) {

    .link, .contact {
        font-size: 3.5vw;
    }

    .imgDiv {
        width: 35vw;
        height: 35vw;
    }

    h1 {
        font-size: 6.5vw;
    }

    figure p {
        margin-top: 6px;
        font-size: 2.7vw;
    }

    .cite {
        font-size: 2.3vw;
    }
}
  
</style>