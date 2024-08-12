<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <nav class="navbar navbar-expand-md" data-bs-theme="dark">
        <div class="container">

            <em> <h3 class="logo"> JTs Portfolio </h3> </em> 
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button> 

            <div class="collapse navbar-collapse" id="navbarColor02">
                <ul class="navbar-nav me-auto"> 

                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/"> 
                            Home
                        </RouterLink>
                    </li> 

                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'mainAbout' }"> 
                            About me
                        </RouterLink>
                    </li> 
                    
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'mainProjects' }"> 
                            Projects 
                        </RouterLink>
                    </li> 
                    
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/four-in-a-row"> 
                            Four in a row
                        </RouterLink>
                    </li> 

                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/macro-tracker"> 
                            Macro Tracker
                        </RouterLink>
                    </li> 
                    
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.link {
    text-decoration: none;
    color: rgb(216, 189, 189);

    font-size: 1.5em;
    margin: 0;

    margin-right: 20px;
}

.logo {
    color: rgb(216, 189, 189);
    margin-right: 1rem;
    margin-top: 0.2rem;
}

.githubIcon {
    width: 1.5em;

    margin: 5px;
}

.nav-link {
    font-size: 1.2em;
}

.row {
    display: flex;
    flex-direction: row;
}

.navbar {
    background-color: var(--main-navbar-color);
}
</style>