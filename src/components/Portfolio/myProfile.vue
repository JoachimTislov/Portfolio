<script setup lang="ts">
import socialLinks from './socialLinks.vue'

import { personalData } from '@/Data/personal'

import buttonTemplate from './ButtonTemplate.vue'

</script>

<template>
  <div class="box">
    <div class="d-flex flex-column m-2">
      <img class="mx-auto" src="@\\assets\\images\\joachim.png" />

      <h1>Hi, I'm {{ personalData.name }} </h1>
      <socialLinks />
    </div>

    <div class="d-flex flex-column justify-content-center align-items-center textContainer">

      <div class="p-3 rounded textBox border border-3 border-secondary">
        <p> {{ personalData.intro }} </p>
      </div>

      <div class="m-1 d-flex w-80">
        <buttonTemplate class="m-2" buttonName="Regarding Me" color="#171717" routerLink="/aboutMe" />
        <buttonTemplate class="m-2" buttonName="Contact Me" color="#171717" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.textContainer {
  width: 35%;
}

.textBox {
  background-color: rgb(39, 43, 41);
  color: darkgray;
}

h1 {
  font-size: clamp(2rem, 3vw, 3rem);
  margin: 0;
}

.box {
  backdrop-filter: blur(20px);
  border-radius: 10px;
  background-color: var(--profile-background-color);
  box-shadow:
    0 0 8px 8px rgba(0, 0, 0, 0.5),
    0 0 0 0 rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  margin-top: 2rem;
  padding: 0.75rem;
}

img {
  width: clamp(10rem, 15vw, 20rem);
  height: clamp(10rem, 15vw, 20rem);

  border-radius: 50%;
}

.link {
  text-decoration: none;
  color: rgb(216, 189, 189);

  font-size: 2.5vw;
}

.link:hover {
  color: #3a3a3a;
}

@media (max-width: 1400px) {
  .textContainer {
    width: 50%;
  }
}

@media (max-width: 800px) {
  .box {
    flex-direction: column;
  }

  .textContainer {
    width: 70%;
  }
}
</style>
