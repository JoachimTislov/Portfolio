<script setup lang="ts">

import { RouterLink } from 'vue-router';

import { token } from '@/Logic/MacroTracker/token'
import { routeToPage } from '@/Logic/MacroTracker/routeToPage';
import { fetchResource } from '@/Logic/MacroTracker/Ajax/ajax';
import { login_alert } from '@/Logic/MacroTracker/initVariables';

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

const username = localStorage.getItem('username')

</script>

<template>

    <nav class="navbar navbar-expand-md" data-bs-theme="dark">

        <h3 v-if="token"> Macro Tracker - {{ username }}
        </h3>

        <ul class="navbar-nav me-auto">

            <template v-if="token">
                <li class="nav-item">
                    <RouterLink class="nav-link" :to="{ name: 'macroHome' }">
                        Home
                    </RouterLink>
                </li>

                <li class="nav-item">
                    <RouterLink class="nav-link" :to="{ name: 'macroProfile' }">
                        Profile
                    </RouterLink>
                </li>

                <li class="nav-item">
                    <RouterLink class="nav-link" :to="{ name: 'macroMeals' }">
                        Meals
                    </RouterLink>
                </li>

                <button @click="logout()" class="btn btn-outline-danger btn-lg float-right mt-2 text-light"> Log out
                </button>
            </template>

        </ul>
    </nav>

    <div id="alert" class="m-4 alert alert-dismissible alert-success" style="display: none;"></div>

    <RouterView />

</template>
