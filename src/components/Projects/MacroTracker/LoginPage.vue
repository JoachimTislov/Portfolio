<script setup lang="ts">

import { RouterLink } from 'vue-router'
import { validation_messages, login_validation, username, password } from '@/Logic/MacroTracker/initVariables'
import { ValidateText } from '@/Logic/MacroTracker/validation'

import AlertBox from './AlertBox.vue';
import { onMounted } from 'vue';
import { _alert, alertDanger, alertSecondary, alertSuccess } from '@/Logic/MacroTracker/alertFunctions';
import { fetchResource } from '@/Logic/MacroTracker/Ajax/ajax';
import { token } from '@/Logic/MacroTracker/token';
import router from '@/router';

onMounted(() => {
    _alert('Welcome to the login page')
    alertSecondary()
})

async function login() {
    if (login_validation.Password && login_validation.Username) {
        try {
            const json = JSON.stringify({
                username: username.value,
                password: password.value
            })

            const response = await fetchResource('POST', json, '/login', 'api_key')

            if (response) {
                const result: {
                    message: string
                    token: string
                    user_id: string
                    username: string
                } = await response.json()

                // Probably rework this underneath

                _alert(result.message)

                if (response.ok) {
                    token.value = result.token
                    username.value = result.username

                    localStorage.setItem('token', result.token)

                    router.push({ name: 'macroHome' })

                    localStorage.setItem('user_id', result.user_id)
                    localStorage.setItem('username', result.username)

                    alertSuccess()
                } else {
                    alertDanger()
                }
            }
        } catch (error) {
            alert('Error loging in: ' + error)
        }
    } else {
        alertDanger()
        _alert('Fill out the login fields correctly!')
    }
}

</script>

<template>
    <div class="centerDiv">
        <div class="card p-3 border border-1 shadow-lg" style="max-width: 700px; min-width: 400px;">
            <div class="card-body">
                <AlertBox />
                <h1 class="card-title">Macro Tracker </h1>

                <form @submit.prevent>

                    <div class="form-group">
                        <input
                            @input="login_validation.Username = ValidateText($event, validation_messages.login.username.value, 'Username', 'form-control form-control-lg')"
                            class="form-control form-control-lg" type="text" v-model="username" placeholder="Username"
                            required>
                        <div :ref="validation_messages.login.username" class="ml-3 invalid-feedback"
                            style="display: none;">
                        </div>
                    </div>

                    <div class="form-group">
                        <input
                            @input="login_validation.Password = ValidateText($event, validation_messages.login.password.value, 'Password', 'mt-2 form-control form-control-lg')"
                            class="mt-2 form-control form-control-lg" type="password" v-model="password"
                            placeholder="Password" required>
                        <div :ref="validation_messages.login.password" class="ml-3 mb-1 invalid-feedback"
                            style="display: none;"></div>
                    </div>

                    <RouterLink class="btn btn-link" :to="{ name: 'macroRegister' }">
                        Register an account
                    </RouterLink>

                    <br>

                    <button type="submit" class="btn btn-lg btn-outline-primary float-end" @click="login()"> Login
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.centerDiv {
    display: flex;
    justify-content: center;

    margin-top: 10vh;
}
</style>