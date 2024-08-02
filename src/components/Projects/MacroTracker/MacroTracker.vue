<script setup lang="ts">

import router from '@/router';
import { RouterLink } from 'vue-router';

import { token } from '@/Logic/MacroTracker/token'

const logout = async () => {
    if (!token.value) {
        router.push({name: 'macroLogin'})
    } else {
        const response = await fetch(`${import.meta.env.VITE_LOCAL_API_WEB_URL}/logout`, { headers: {'Authorization': token.value} })

        console.log(token.value)

        router.push({name: 'macroLogin'})

        
        token.value = undefined
        localStorage.removeItem('user_id')
    
        const message = (await response.json()).message
        console.log('Error when loggin out', message)
        
    }
}

</script>

<template>

    <h1> Macro Tracker is coming, soon </h1>
    <nav class="navbar navbar-expand-md" data-bs-theme="dark">
    
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

                <li class="ml-5 nav-item">
                    <p @click="logout()" class="nav-link">
                        Logout
                    </p>
                </li> 
            </template>

            <template v-else>
                <li class="nav-item">
                    <RouterLink class="nav-link" :to="{ name: 'macroLogin' }"> 
                        Login
                    </RouterLink>
                </li> 
            </template>
            
        </ul>
    </nav>

    <RouterView />

</template>

<style scoped>



</style>