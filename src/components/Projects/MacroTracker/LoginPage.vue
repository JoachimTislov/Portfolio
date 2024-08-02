<script setup lang="ts">

import { RouterLink } from 'vue-router';

import { ref, onMounted } from 'vue'
import router from '@/router';
import { token } from '@/Logic/MacroTracker/token';
import { initAlertElements, password_validation_message, ValidateText } from '@/Logic/MacroTracker/validation';

const login_alert_message = ref<string>('Welcome to the login page')
const username_validation_message = ref<HTMLElement | null>(null)

onMounted(() => {
    initAlertElements()
    login_alert.value?.focus()
})

const username = ref<string>('Peddi')
const password = ref<string>('peder@123')

const login_alert = ref<HTMLElement | null>(null)

const isUsernameValid = ref<boolean>(true)
const isPasswordValid = ref<boolean>(true)

async function login() {
    if (isPasswordValid.value && isUsernameValid.value) {
        try {

            console.log('Loggin in')

            const json = JSON.stringify({
                "username": username.value,
                "password": password.value
            });

            const response = await fetch(`${import.meta.env.VITE_LOCAL_API_WEB_URL}/login`, {
                method: 'POST',  
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': import.meta.env.VITE_API_KEY
                },
                body: json
            });

            const result = await response.json();

            if (!response.ok) {
                console.log(response)
                login_alert_message.value = result.message
                login_alert.value!.className = "alert alert-danger"
                throw new Error(`HTTP error! Status: ${response.status}`);

            } else {

                console.log('successfully received token', result.token)

                token.value = result.token
                localStorage.setItem('user_id', result.user_id)

                console.log('Moving to home')

                router.push({ name: 'macroHome' })
            }

        } catch (error) {
            alert('Error loging in: ' + error);
        }
    }   
}


</script>

<template>
    <div class="d-flex vh-100">
        <div class="container">
            <div class="card" style="max-width: 500px">
                <div class="card-body">
                    <div ref="login_alert" class="alert alert-success"> {{ login_alert_message }} </div>
                    <h1 class="card-title">Macro Tracker </h1>
                    
                    <form>
                        <div class="form-group">
                            <input @input="isUsernameValid = ValidateText($event, username_validation_message, 'Username', 'form-control form-control-lg')" class="form-control form-control-lg" type="text" v-model="username" placeholder="Username" required>
                            <div ref="username_validation_message" class="ml-3 invalid-feedback" style="display: none;"></div>
                        </div>

                        <div class="form-group">
                            <input @input="isPasswordValid = ValidateText($event, password_validation_message, 'Password', 'mt-2 form-control form-control-lg')" class="mt-2 form-control form-control-lg" type="password" v-model="password" placeholder="Password" required>
                            <div ref="password_validation_message" class="ml-3 mb-1 invalid-feedback" style="display: none;"></div>
                        </div>

                        <RouterLink class="btn btn-link" to="">
                                Register an account
                        </RouterLink>

                        <br>

                        <button type="submit" class="btn btn-lg btn-outline-primary btn-block" @click.stop.prevent="login()"> Login </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>



</style>