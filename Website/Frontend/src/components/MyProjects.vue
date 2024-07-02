<script setup lang="ts">
    const projects = [
        {
            name: 'Macro Tracker', 
            githubLink: 'https://github.com/JoachimTislov/MacroTracker', 
            description: `Me and another student developed a Macro Tracker website. We had around two months
            of development time, and aimed for the best grade. I handled most of the backend and frontend, while my fellow
            student did most of the styling. Macro Tracker consists of a simple authentication system, personal meals and
            ingredients, user profile, and a meal calender. The Macro Tracker also use an API from kassal.app. I am planning
            on extending the project and perhaps publish an app later on..`, 
            tools: {
                frontend: [
                    {name: 'CSS', icon: ['fab', 'css3'], link: 'https://developer.mozilla.org/en-US/docs/Web/CSS'},
                    {name: 'HTML', icon: ['fab', 'html5'], link: 'https://developer.mozilla.org/en-US/docs/Web/HTML'},
                    {name: 'Javascript', icon: ['fab', 'js'], link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'},
                    {name: 'Vue FrameWork', icon: ['fab', 'vuejs'], link: 'https://vuejs.org/guide/introduction.html'},
                ],

                backend: [
                    {name: 'Python', icon: ['fab', 'python'], link: 'https://www.python.org/'},
                    {name: 'Flask', icon: ['fab', 'flask'], link: 'https://flask.palletsprojects.com/en/3.0.x/'},
                    {name: 'SQLite', icon: ['fab', 'database'], link: 'https://www.sqlite.org/docs.html'},
                ]
            }, 
            imageLink: '/MacroTracker.png', 
            routerLink: '/MacroTracker'
        }
    ]
</script>

<template>
    <div class="project_main d-flex flex-column justify-content-center">
        <div class="accordion" id="projectAccordion">
            <div class="accordion" role="tablist">
                <b-card v-for="project in projects" :key="project.name" no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle="`accordion-${project.name}`" variant="info">{{ project.name }} </b-button>
                  </b-card-header>
                  <b-collapse :id="`accordion-${project.name}`" visible accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-card-text> {{ project.description }} </b-card-text>
                      
                    </b-card-body>
                  </b-collapse>
                </b-card>
            </div>
            <div v-for="project in projects" :key="project.name" class="accordion-item">
                <h2 class="accordion-header" :id="project.name + '-heading'">
                    <button class="accordion-button" type="button" :data-bs-toggle="`${project.name}-collapse`" :data-bs-target="'#' + project.name +'-collapse'" aria-expanded="false" aria-controls="collapse">
                        <div class="d-flex flex-row">
                            <h1>  {{ project.name }} </h1>
                            <a :href="project.githubLink"> <img src="/github.png" alt="github"> </a>
                        </div>
                    </button>
                </h2>
                <div :id="project.name + '-collapse'" :class="'accordion-collapse' + project.name + '-collapse show'" aria-labelledby="headingOne" data-bs-parent="#projectAccordion">
                    <div class="accordion-body">
                        <div class="project_info d-flex flex-column">
                            <p> {{ project.description }} </p>
                            
                            <p class="m-0 mb-1"> Main page </p>
                            <img class="m-0" :src="project.imageLink" alt="Project Image">
                        </div>
            
                        <fieldset> <legend> Tools </legend>
                            <div class="d-flex flex-row">
                                <h3> Frontend </h3>
                                <div class="d-flex flex-wrap">
                                    <div v-for="tool in project.tools.frontend" :key="tool.name" class="d-flex flex-row">
                                        <h4>  {{ tool.name }} </h4> 
                                        <font-awesome-icon :icon="tool.icon" /> 
                                    </div>
                                </div>
                                <h3> Backend </h3>
                                <div class="d-flex flex-wrap">
                                    <div class="m-1" v-for="tool in project.tools.backend" :key="tool.name">
                                        <h4>  {{ tool.name }} </h4> 
                                        <font-awesome-icon :icon="tool.icon" /> 
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.project_main {
    padding: 2%;
}

.accordion-body {
    background-color: #29271B;
    color: white;
}

h1, h2, h3, h4 {
    font-size: 3vw;
    padding: 0;
    margin: 0;
}

p {
    font-size: 1.8vw;
}

a img {
    margin-bottom: 5px;
    margin-left: 5px;
    width: 3vw;
    height: auto;
}

.project_info img {
    margin-bottom: 5px;
    margin-left: 5px;
    width: 100%;
    height: auto;
}
 
</style>
