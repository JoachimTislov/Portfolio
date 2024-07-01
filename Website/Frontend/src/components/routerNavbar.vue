<script setup lang="ts">
import { RouterLink } from 'vue-router'

const pages = [
    {link: '/about', name: 'About'},
    {link: '/projects', name: 'Projects'},
]
</script>


<template>
    <nav class="navbar navbar-expand-sm bg-dark" data-bs-theme="dark">
        <div class="container-fluid">
            <RouterLink to="/" class="nav-brand"> Home </RouterLink>
            <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="navbarColor01">
                <ul class="navbar-nav me-auto">
                    <li v-for="page in pages" :key="page" class="nav-item">
                        <RouterLink :to="page.link" class="nav-link active"> {{ page.name }} </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>