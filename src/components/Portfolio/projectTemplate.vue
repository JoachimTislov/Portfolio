<script setup lang="ts">
import { CAccordionHeader, CAccordionBody } from '@coreui/vue';
defineProps(['project']) 
</script>

<template>
    <CAccordionHeader>
        <h1 class="m-0 p-0">
            {{ project.name }}
        </h1>
    </CAccordionHeader>
    <CAccordionBody>
        <div class="d-flex flex-column">
            <div class="description">
                <p class="" v-for="paragraph in project.description" :key="paragraph"> {{ paragraph }} </p>

                <small> Tools: </small>
                <div class="d-flex flex-wrap">
                    <div class="m-1 p-1 bg-dark" v-for="tool in project.tools" :key="tool.name">
                        <a class="link" :href="tool.link"> {{ tool.name }} <font-awesome-icon v-if="tool.icon"
                                class="icon" :icon="tool.icon" /> </a>
                    </div>
                </div>

                <br>

                <RouterLink v-if="project.routerLink" :to="project.routerLink">
                    <p> Go to {{ project.name }} </p>
                </RouterLink>

                <a v-if="project.githubLink" :href="project.githubLink">
                    Github repository
                </a>
            </div>

            <img v-if="project.imageLink" class="project_img" :src="project.imageLink" alt="Project Image">

        </div>

    </CAccordionBody>
</template>


<style scoped>
.description {
    background-color: rgb(61, 53, 53);
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

small {
    font-size: clamp(0.5rem, 3vw, 1.5rem);
}

.icon,
a {
    font-size: clamp(1.2rem, 3vw, 1.8rem);
}

h1 {
    font-size: clamp(1.2rem, 3vw, 2rem);
}
</style>