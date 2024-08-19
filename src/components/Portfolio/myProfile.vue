<script setup lang="ts">
import socialLinks from './socialLinks.vue'

import { personalData } from '@/Data/personal'

const name = personalData['name']
</script>

<template>
  <div class="box">
    <div class="info d-flex flex-column">
      <h1>Hey, I'm {{ name }}</h1>

      <socialLinks class="socialLinks" />

      <figure>
        <blockquote class="blockquote">
          <p class="mb-0">
            “A good programmer is someone who always looks both ways before crossing a one-way
            street.”
          </p>
        </blockquote>

        <p class="cite">- Doug Linder, computer scientist</p>
      </figure>
    </div>

    <img src="@\\assets\\images\\joachim.png" />
  </div>
</template>

<style scoped>
.info {
  margin: 1rem;
  margin-right: 0.2rem;
  margin-left: clamp(1rem, 1.5vw, 2rem);
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

h1,
p {
  color: var(--text-color);
}

h1 {
  font-size: clamp(3.5rem, 4vw, 5rem);
  margin-top: 0;
}

@media (max-width: 990px) {
  h1 {
    font-size: clamp(2.4rem, 2.5vw, 3rem);
  }
}

p {
  font-size: clamp(1.5rem, 2.5vw, 2.5rem);
}

.box {
  background-color: var(--profile-background-color);
  border-radius: 30px;
  box-shadow:
    0 0 8px 8px rgba(0, 0, 0, 0.5),
    0 0 0 0 rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;

  margin-top: 2rem;
  padding: 0.75rem;
}

img {
  width: clamp(18rem, 35vw, 29rem);
  height: clamp(18rem, 35vw, 29rem);

  border-radius: 50%;
}

.link {
  text-decoration: none;
  color: rgb(216, 189, 189);

  margin-top: 3%;

  font-size: 2.5vw;
}

.link:hover {
  color: #3a3a3a;
}

@media (max-width: 767px) {
  .box {
    flex-direction: column-reverse;
  }

  img {
    margin-left: 0;
  }

  .info {
    margin: 0.5rem;
  }

  h1 {
    margin: 0;
    margin-top: 1rem;
  }
}
</style>
