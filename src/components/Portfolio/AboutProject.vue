<script setup lang="ts">
import { projectToShow } from '@/Logic/Portfolio/variables'
import ButtonTemplate from './ButtonTemplate.vue';
import { viewName } from '@/Logic/Portfolio/functions'
import { watch } from 'vue'

watch(projectToShow, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<template>
    <div v-if="projectToShow" class="card mt-4">
        <div class="card-header p-4">
            <h1 class="card-title m-0">
                {{ projectToShow.name }}
            </h1>
        </div>
        <div class="card-body">
            <div class="d-flex flex-column">
                <div class="description">
                    <p class="" v-for="paragraph in projectToShow.description" :key="paragraph">{{ paragraph }}</p>

                    <h6> Tools: </h6>
                    <div class="d-flex flex-wrap">
                        <div class="m-1 p-2 bg-dark" v-for="tool in projectToShow.tools" :key="tool.name">
                            <a class="link" :href="tool.link">
                                {{ tool.name }} <font-awesome-icon v-if="tool.icon" class="icon" :icon="tool.icon" />
                            </a>
                        </div>
                    </div>

                    <br />

                    <div class="d-flex">

                        <ButtonTemplate v-if="projectToShow.viewProjectLink" :arrow_right_side="true"
                            :buttonName="viewName(projectToShow)" arrow_type="right" color="rgb(80, 60, 60)"
                            :router-link="projectToShow.viewProjectLink" />

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.description {
    background-color: rgb(59, 49, 49);
    color: rgb(247, 228, 228);

    padding: 5%;
    margin-left: 0.3vw;
    margin-right: 0.3vw;

    border-radius: 4px;
}

.project_img {
    margin-top: 5%;

    border-radius: 8px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
}

.link {
    text-decoration: none;
}

h6 {
    font-size: clamp(0.8rem, 1.5vw, 1.2rem);
}

.icon,
a {
    font-size: clamp(1rem, 1vw, 1.2rem);
}

h1 {
    font-size: clamp(1.2rem, 2vw, 1.5rem);
}
</style>
