<script setup lang="ts">

const skills = [
    {name: 'Visual Studio', icon: ['fas', 'code'], link: 'https://code.visualstudio.com/'},
    {name: 'Git', icon: ['fab', 'github'], link: 'https://docs.github.com/en'},
    {name: 'Bootstrap', icon: ['fab', 'bootstrap'], link: 'https://getbootstrap.com/'},
    {name: 'CSS', icon: ['fab', 'css3'], link: 'https://developer.mozilla.org/en-US/docs/Web/CSS'},
    {name: 'HTML', icon: ['fab', 'html5'], link: 'https://developer.mozilla.org/en-US/docs/Web/HTML'},
    {name: 'Javascript', icon: ['fab', 'js'], link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'},
    {name: 'Typescript', link: 'https://www.typescriptlang.org/'},
    {name: 'Vue FrameWork', icon: ['fab', 'vuejs'], link: 'https://vuejs.org/guide/introduction.html'},
    {name: 'Python', icon: ['fab', 'python'], link: 'https://www.python.org/'},
    {name: 'MySQL', icon:  ['fas','database'], link: 'https://www.mysql.com/'},
    {name: 'SQLite', icon:  ['fas','database'], link: 'https://www.sqlite.org/docs.html'},
    {name: 'C#', link: 'https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/'},
    {name: '.NET', link: 'https://dotnet.microsoft.com/en-us/'},
    {name: 'Flask', icon: ['fas', 'flask'], link: 'https://flask.palletsprojects.com/en/3.0.x/'},
]

const jobs = ['Full-Stack', 'IT-Consultant', 'Technology Integration Specialist', 'Software Engineer', 'Game developer', 'Data Engineer', 'Application/Web Developer', 'Database Administrator']

</script>

<template>
    <div class="aboutBox">
        <div class="text">
            <p> 
                I am a 21 year old male from Bærum, live with my Alaskan husky - Leo.
                Played football for over 14 years, which provided me with extensive team-building skills.
            </p>
            
            <p>
                Technology has been my passion since i got access to it, leading me to pursue
                a bachelor's degree in Computer Technology.      
            </p>
            
            <p> <strong> Patient, dedicated and driven </strong> describe me the best </p>

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
}

p {
    margin: 1em 0;
}



@media (max-width: 1100px) {
    .skill {
        padding: 1.2vw;
        margin: 0.5vw;
    }
}

@media (max-width: 900px) {
    p {
        font-size: 2vw;
    }

    h3 {
        font-size: 3vw;
    }
}

@media (min-width: 901px) {
    p {
        font-size: 1.3vw;
    }

    h3 {
        font-size: 1.7vw;
    }
}
    
</style>
