<script setup lang="ts">

import { personalData } from '@/Data/personal';

const email = personalData['email']

</script>

<template>

    <div class="box d-flex justify-content-around">
        <p class="contact"> 
            Please contact me at <a :href="'mailto:' + email"> {{ email }} </a> 
        </p>
    </div>

</template>

<style scoped>

.box {
    background-color: #1A1916;
}

.contact {
    text-decoration: none;
    color: rgb(216, 189, 189);

    margin: 1rem;

    font-size: clamp(0.8rem, 3vw, 2.5rem);
}

.gmail {
    margin-top: -5px;
    margin-left: 5px;

    width: 2em;
    height: auto;
}

</style>