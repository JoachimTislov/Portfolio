<script setup lang="ts">

import { RouterLink } from 'vue-router'
import { validation_messages, login_alert, login_validation, username, password } from '@/Logic/MacroTracker/initVariables'
import { ValidateText } from '@/Logic/MacroTracker/validation'

import { login } from '@/Logic/MacroTracker/Ajax/login'

</script>

<template>
    <div class="centerDiv">
        <div class="card mx-auto" style="max-width: 500px">
            <div class="card-body">
                <div ref="login_alert" class="alert alert-success">
                    <h4> Welcome to the login page </h4>
                </div>
                <h1 class="card-title">Macro Tracker </h1>

                <form @submit.prevent>

                    <div class="form-group">
                        <input
                            @input="login_validation.Username.value = ValidateText($event, validation_messages.login.username.value, 'Username', 'form-control form-control-lg')"
                            class="form-control form-control-lg" type="text" v-model="username" placeholder="Username"
                            required>
                        <div :ref="validation_messages.login.username" class="ml-3 invalid-feedback"
                            style="display: none;">
                        </div>
                    </div>

                    <div class="form-group">
                        <input
                            @input="login_validation.Password.value = ValidateText($event, validation_messages.login.password.value, 'Password', 'mt-2 form-control form-control-lg')"
                            class="mt-2 form-control form-control-lg" type="password" v-model="password"
                            placeholder="Password" required>
                        <div :ref="validation_messages.login.password" class="ml-3 mb-1 invalid-feedback"
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

<style scoped>
.centerDiv {
    display: flex;
    justify-content: center;

    margin-top: 20vh;
}
</style>