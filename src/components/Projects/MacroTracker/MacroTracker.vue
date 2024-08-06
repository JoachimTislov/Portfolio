<script setup lang="ts">

import { RouterLink } from 'vue-router';

import { token } from '@/Logic/MacroTracker/token'
import { routeToPage } from '@/Logic/MacroTracker/routeToPage';
import { fetchResource } from '@/Logic/MacroTracker/Ajax/ajax';
import { login_alert, username } from '@/Logic/MacroTracker/initVariables';

const logout = async () => {

    const response = await fetchResource('POST', '', '/logout', login_alert.value, 'token')

    if (response && response.ok) {
        routeToPage('macroLogin')

        token.value = undefined
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        localStorage.removeItem('username')
    }
}

const routes = ['Home', 'Meals', 'Ingredients', 'Profile']

</script>

<template>
    <nav class="navbar navbar-expand-md" data-bs-theme="dark">
        <div class="container">


            <h3 class="logo" v-if="token"> Macro Tracker - {{ username }} </h3>


            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMacroTracker"
                aria-controls="navbarMacroTracker" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarMacroTracker">
                <ul class="navbar-nav me-auto">
                    <template v-if="token">
                        <li class="nav-item" v-for="route in routes" :key="route">
                            <RouterLink class="nav-link" :to="{ name: `macro${route}` }">
                                {{ route }}
                            </RouterLink>
                        </li>
                    </template>
                </ul>

                <button v-if="token" @click="logout()" class="btn btn-outline-danger btn-lg"> Log
                    out
                </button>
            </div>
        </div>
    </nav>

    <div id="alert" class="m-4 alert alert-dismissible alert-success" style="display: none;"></div>

    <RouterView />

</template>


<style scoped>
.logo {
    margin: 0;
    margin-right: 2rem;
}

li {
    font-size: x-large;
}
</style>