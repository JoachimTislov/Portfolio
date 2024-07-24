<script setup lang="ts">

import socialLinks from './socialLinks.vue'

</script>

<template>
    <div class="box"> 
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

        <img src="@\\assets\\images\\joachim.png">
    </div>
</template>

<style scoped>

.info {
    margin-top: 1%;
    margin-left: 1%;
}

blockquote {
    margin-bottom: 0;
}

.cite {
    margin: 0;
    margin-left: 1vw;
    font-size: clamp(1rem, 2vw, 2rem);
    color: grey;
}

h1 {
    font-size: clamp(3rem, 5vw, 6rem);
}

p {
    font-size: clamp(1.5rem, 2.5vw, 2.5rem);
}

.socialLinks {
    margin-top: -6px;
}

.box {
    background-color: #232931;
    border-radius: 30px;
    box-shadow: 0 0 8px 8px rgba(0, 0, 0, 0.5), 0 0 0 0 rgba(0, 0, 0, 0.5);

    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;

    margin-top: 1rem;
    padding: 0.75rem;
}

img {
    width: clamp(20rem, 30vw, 30rem);
    height: clamp(20rem, 30vw, 30rem);

    margin-left: clamp(1rem, 2vw, 2rem);

    border-radius: 50%;
}

.link {
    text-decoration: none;
    color: rgb(216, 189, 189);

    margin-top: 3%;

    font-size: 2.5vw;
}

.link:hover {
    color: #3A3A3A;
}

@media (max-width: 769px) {
    .box {
        flex-direction: column-reverse;
    }

    img {
        margin-left: 0;
    }

    .info {
        margin: 1rem;
    }

}

</style>