<script setup lang="ts">
import { personalData } from '@/Data/personal';

const skills = personalData["skills"]
const jobs = personalData["jobs"]

const about = personalData['about']

const situation = personalData['situation']

</script>

<template>
    <div class="aboutBox">
        <div class="text m-1">
            <div class="mt-3">

                <p v-for="paragraph in about" :key="paragraph"> {{ paragraph }}</p>
                
                <p> <strong> Patient, dedicated and driven </strong> describe me the best </p>

                <h3> Situation: </h3>

                <p> {{ situation }} </p>

                <h3> Proficient in: </h3>

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

                <h3 class="mt-2"> Desired Positions: </h3>

                <div class="d-flex flex-wrap">
                    <div class="skill bg-dark" v-for="job in jobs" :key="job">
                        <p class="p-0 m-0">  {{ job }} </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

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
    background-color: #3A3A3A;
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

h3 {
    margin: 0;
}

p {
    font-size: clamp(1.1rem, 3vw, 2rem);
} 

h3 {
     font-size: clamp(1.2rem, 3vw, 2.5rem);
}
</style>
