<script setup lang="ts">

import { RouterLink } from 'vue-router';

const username = ''
const password = ''
let isUsernameValid = false
let isPasswordValid = false

function checkIfPasswordIsValid(input_name: string, className: string) {
    return false
}

function checkIfUsernameIsValid(input_name: string, className: string) {
    return false
}

</script>

<template>
    <div class="d-flex vh-100">
        <div class="container">
            <div class="card" style="max-width: 500px">
                <div class="card-body">
                    <div id="login_alert" class="alert alert-success"> <h5> <strong> Hello </strong> </h5>  </div>
                    <h1 class="card-title">Macro Tracker </h1>
                    
                    <form @submit.prevent>
                        <div class="form-group">
                            <input @input="isUsernameValid = checkIfUsernameIsValid('username_invalid', 'form-control form-control-lg')" class="form-control form-control-lg" type="text" v-model="username" placeholder="Username" required>
                            <div id="username_invalid" class="ml-3 invalid-feedback" style="display: none;"></div>
                        </div>

                        <div class="form-group">
                            <input @input="isPasswordValid = checkIfPasswordIsValid('password_invalid', 'mt-2 form-control form-control-lg')" class="mt-2 form-control form-control-lg" type="password" v-model="password" placeholder="Password" required>
                            <div id="password_invalid" class="ml-3 mb-1 invalid-feedback" style="display: none;"></div>
                        </div>

                        <div class="form-group"> 
                            <RouterLink class="btn btn-link" to="">
                                 Register an account
                            </RouterLink>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-lg btn-outline-primary btn-block" @click="console.log('log in')"> Login </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>



</style>