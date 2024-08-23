<script setup lang="ts">
import { personalData } from '@/Data/personal'

const skills = personalData['skills']
const jobs = personalData['jobs']

const about = personalData['about']

const situation = personalData['situation']
</script>

<template>
  <div class="aboutBox">
    <div class="text m-1">
      <div class="mt-3">
        <p v-for="paragraph in about" :key="paragraph">{{ paragraph }}</p>

        <p><strong> Patient, dedicated and driven </strong> describe me the best</p>

        <h4>Situation:</h4>

        <p class="situation">{{ situation }}</p>

        <h4>Proficient in:</h4>

        <div class="d-flex flex-wrap">
          <div class="skill bg-dark" v-for="skill in skills" :key="skill.name">
            <p class="p-0 m-0">
              <a class="m-0 link" :href="skill.link">
                {{ skill.name }}

                <font-awesome-icon v-if="skill.icon" :icon="skill.icon" />
              </a>
            </p>
          </div>
        </div>

        <h4 class="mt-2">Desired Positions:</h4>

        <div class="d-flex flex-wrap">
          <div class="skill bg-dark" v-for="job in jobs" :key="job">
            <p class="p-0 m-0">{{ job }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.situation {
  margin-left: 0.5rem;
}

.link {
  text-decoration: none;
}

.typescript {
  width: 2vw;
}

.icon {
  font-size: 1.5vw;
}

.aboutBox {
  background-color: var(--secondary-background-color);
}

.text {
  padding: 5%;
  padding-top: 1.14321%;
}

.skill {
  padding: 0.9vw;
  margin: 0.6vw;

  color: darkgrey;
}

h4 {
  margin: 0;
  color: var(--text-color);
  font-size: clamp(1rem, 1vw, 1.5rem);
}
</style>
