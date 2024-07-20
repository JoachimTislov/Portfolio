<script setup lang="ts">
import { CAccordionHeader, CAccordionBody } from '@coreui/vue';

defineProps(['project']) 
</script>

<template>
    <CAccordionHeader>
        <h1 class="m-0 p-0">  {{ project.name }} </h1>
    </CAccordionHeader>
    <CAccordionBody>
        <div class="d-flex flex-column">

            <div class="description" >
                <p class="" v-for="paragraph in project.description" :key="paragraph"> {{ paragraph }} </p>


                <div class="m-2 tools_container d-flex flex-row align-items-center">
                    <div class="frontend d-flex">
                        <div class="m-1" v-for="tool in project.tools.frontend" :key="tool.name">
                           <a :href="tool.link"> <font-awesome-icon class="icon" :icon="tool.icon" /> </a> 
                        </div>
                    </div>
                
                    <div class="backend d-flex">
                        <div class="m-1" v-for="tool in project.tools.backend" :key="tool.name">
                            <a :href="tool.link"> <font-awesome-icon class="icon" :icon="tool.icon" /> </a> 
                        </div>
                    </div>
                </div>

            </div>

            <img class="project_img" :src="project.imageLink" alt="Project Image">
        </div>

    </CAccordionBody>
</template>


<style scoped>
.frontend {
    margin-right: 0.5vw;
}

.backend {
    margin-left: 0.5vw;
}

.description {
    background-color: rgb(61, 53, 53);
    color: rgb(247, 228, 228);
    
    padding: 5%;
    margin-left: 0.3vw;
    margin-right: 0.3vw;

    border-radius: 4px;
}

.icon {
    font-size: 3vw;
}


.project_img {
    margin-top: 5%;

    border-radius: 8px; 
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    
    transition: box-shadow 0.3s ease;
}

.project_img:hover {
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.5);

    transform: scale(1.2);
}

h1 {
    font-size: 3vw;
}

p {
    font-size: 1.8vw;
}

.githubIcon {
    margin-bottom: 3px;
    margin-left: 8px;
    width: 3vw;
}

@media (min-width: 700px) {

    .icon {
        font-size: 2vw; /* Adjust font size for smaller screens */
    }

    p {
        font-size: 1.2vw;
    }

    .githubIcon {
        width: 2.5vw;
    }

    h1 {
        font-size: 1.5vw;
    }
    
}
</style>