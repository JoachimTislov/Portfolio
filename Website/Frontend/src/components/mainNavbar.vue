<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>

    <nav class="navbar navbar-expand-md bg-dark" data-bs-theme="dark">
        <div class="container-fluid">
            
            <div class="d-flex align-content-center">
                <RouterLink class="link navbar-brand" to="/"> 
                    <em> JTs Portfolio </em> 
                </RouterLink>

                <a href="https://github.com/JoachimTislov/JTs-Portfolio"> 
                    <img class="githubIcon" src="/github.png" alt="github"> 
                </a>
            </div>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarColor02">
                <ul class="navbar-nav me-auto">
                    
                    <li class="nav-item">
                        <RouterLink class="nav-link active" to="/"> 
                            Home 
                        </RouterLink>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#"> 
                            Macro Tracker
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#"> Mini games </a>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                            More Projects
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Separated link</a>
                        </div>
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

    font-size: 1.2em;
    margin: 0;
}

.githubIcon {
    width: 1.5em;

    margin: 5px;
}


</style>