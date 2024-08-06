<script setup lang="ts">

import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import { initAlertElements, username_validation_message, password_validation_message, login_alert, isUsernameValid, username, password, isPasswordValid } from '@/Logic/MacroTracker/initVariables'
import { ValidateText } from '@/Logic/MacroTracker/validation'

import { login } from '@/Logic/MacroTracker/Ajax/login'

onMounted(async () => {
    initAlertElements()
})
</script>

<template>
    <div class="container">
        <div class="card mx-auto" style="max-width: 500px">
            <div class="card-body">
                <div ref="login_alert" class="alert alert-success">
                    <h4> Welcome to the login page </h4>
                </div>
                <h1 class="card-title">Macro Tracker </h1>

                <form @submit.prevent>
                    <div class="form-group">
                        <input
                            @input="isUsernameValid = ValidateText($event, username_validation_message, 'Username', 'form-control form-control-lg')"
                            class="form-control form-control-lg" type="text" v-model="username" placeholder="Username"
                            required>
                        <div ref="username_validation_message" class="ml-3 invalid-feedback" style="display: none;">
                        </div>
                    </div>

                    <div class="form-group">
                        <input
                            @input="isPasswordValid = ValidateText($event, password_validation_message, 'Password', 'mt-2 form-control form-control-lg')"
                            class="mt-2 form-control form-control-lg" type="password" v-model="password"
                            placeholder="Password" required>
                        <div ref="password_validation_message" class="ml-3 mb-1 invalid-feedback"
                            style="display: none;"></div>
                    </div>

                    <RouterLink class="btn btn-link" :to="{ name: 'macroRegister' }">
                        Register an account
                    </RouterLink>

                    <br>

                    <button type="submit" class="btn btn-lg btn-outline-primary btn-block" @click="login()"> Login
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
