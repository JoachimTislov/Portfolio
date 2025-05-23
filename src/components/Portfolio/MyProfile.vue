<script setup lang="ts">
import socialLinks from './socialLinks.vue'

import { personalData } from '@/Data/personal'

import ButtonTemplate from './ButtonTemplate.vue'
</script>

<template>
  <div class="box">
    <div class="d-flex flex-column m-2 profileBox p-3">
      <img class="mx-auto" src="@\\assets\\images\\joachim.png" />

      <h1>Hi, I'm {{ personalData.name }}</h1>
      <socialLinks />
    </div>

    <div class="d-flex flex-column justify-content-center align-items-center p-3 textContainer">
      <div class="p-3 rounded textBox border border-3 border-secondary">
        <p>{{ personalData.intro }}</p>
      </div>

      <div class="mt-1 d-flex">
        <a class="mt-1 me-1" :href="`mailto: ${personalData.email}`">
          <button type="button" class="btn p-3 contact">
            <font-awesome-icon class="me-1 arrow" :icon="['fas', `arrow-right`]" />
            <p class="m-0">Contact</p>
          </button>
        </a>
        <ButtonTemplate
          class="mt-1 ms-1"
          buttonName="About Me"
          color="#222222"
          router-link="/more-of-me"
          :arrow_right_side="true"
          arrow_type="right"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}

.contact {
  color: white;
  display: flex;
  align-items: center;
  background-color: #130e0e;
}

.contact .arrow {
  display: none;
}

.contact:hover {
  background-color: #241a1a;

  .arrow {
    display: block;
  }
}

.textContainer {
  max-width: 330px;
}

.textBox {
  background-color: rgb(39, 43, 41);
  color: darkgray;
}

h1 {
  font-size: clamp(2rem, 3vw, 3rem);
  margin: 0;
}

.profileBox,
.textContainer {
  background-color: var(--profile-background-color);
  box-shadow:
    0 0 8px 8px rgba(0, 0, 0, 0.5),
    0 0 0 0 rgba(0, 0, 0, 0.5);
}

.box {
  backdrop-filter: blur(20px);
  border-radius: 10px;

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

@media (max-width: 1300px) {
  .textContainer {
    margin-top: 1rem;
    width: 50%;
  }
}

@media (max-width: 800px) {
  .box {
    flex-direction: column;
  }

  .textContainer {
    width: 100%;
  }
}
</style>
