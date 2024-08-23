<script setup lang="ts">
import { personalData } from '../../Data/personal'
import ButtonTemplate from './ButtonTemplate.vue';
</script>

<template>
    <div class="projectsContainer p-5 mt-4">
        <h2> My Projects </h2>
        <div class="card mt-4" v-for="(project, index) in personalData.projects" :key="index">
            <div class="card-header d-flex">
                <div class="flex-column">
                    <h3 class="card-title m-0"> {{ project.name }} </h3>
                    <div class="ms-1">
                        <small> {{ project.date }} </small>
                        <br>
                        <small v-if="project.group_size"> Group size: {{ project.group_size }} </small>
                        <small v-else> Solo project </small>
                        <small v-if="project.original">, original version </small>
                    </div>
                </div>


            </div>
            <div class="card-body">
                <div class="ms-auto d-flex">
                    <ButtonTemplate class="me-2" buttonName="About" color="#2222"
                        :router-link="project.aboutProjectLink" />
                    <ButtonTemplate v-if="project.viewProjectLink" :buttonName="'View ' + project.name" color="#171717"
                        :router-link="project.viewProjectLink" />
                </div>


                <div class="d-flex bodyBox">
                    <div class="p-3 m-2 rounded border border-3 border-secondary">
                        <p> {{ project.intro }} </p>
                    </div>

                    <img :src="project.image">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.projectsContainer {
    background-color: var(--profile-background-color);
}

.bodyBox {
    justify-content: space-evenly;
    flex-direction: row;
    align-items: center;
}

img {
    width: 50%;
}

@media (max-width: 990px) {
    .bodyBox {
        justify-content: center;
        flex-direction: column;
    }

    img {
        width: 90%;
    }
}
</style>