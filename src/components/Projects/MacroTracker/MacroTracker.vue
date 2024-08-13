<script setup lang="ts">

import { RouterLink } from 'vue-router';

import { token } from '@/Logic/MacroTracker/token'
import { routeToPage } from '@/Logic/MacroTracker/routeToPage';
import { fetchResource } from '@/Logic/MacroTracker/Ajax/ajax';
import { fetchingResource, username } from '@/Logic/MacroTracker/initVariables';

const logout = async () => {

    token.value = undefined
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('username')

    await fetchResource('POST', '', '/logout', 'token')

    fetchingResource.value = false

    routeToPage('macroLogin')
}

const routes = ['Home', 'Calender', 'Meals', 'Ingredients', 'Profile']

</script>

<template>
    <nav v-if="token" class="navbar navbar-expand-md" data-bs-theme="dark">
        <div class="container">

            <h4 class="logo"> {{ username }} </h4>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMacroTracker"
                aria-controls="navbarMacroTracker" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarMacroTracker">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item" v-for="route in routes" :key="route">
                        <RouterLink class="nav-link" :to="{ name: `macro${route}` }">
                            {{ route }}
                        </RouterLink>
                    </li>
                </ul>

                <button @click="logout()" class="btn btn-outline-danger btn-lg"> Log
                    out
                </button>
            </div>
        </div>
    </nav>

    <RouterView />

</template>


<style scoped>
.logo {
    margin: 0;
    margin-right: 2rem;
}

li {
    font-size: large;
}
</style>