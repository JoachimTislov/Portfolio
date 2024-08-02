<script setup lang="ts">

import { RouterLink } from 'vue-router';

import { ref, onMounted } from 'vue'
import router from '@/router';

const login_alert_message = ref<string>('Welcome to the login page')
    
onMounted(() => {
    username_validation_message.value?.focus()
    password_validation_message.value?.focus()
    login_alert.value?.focus()
})

const username = ref<string>('Peddi')
const password = ref<string>('peder@123')

const username_validation_message = ref<HTMLInputElement | null>(null)
const password_validation_message = ref<HTMLInputElement | null>(null)
const login_alert = ref<HTMLElement | null>(null)

const isUsernameValid = ref<boolean>(true)
const isPasswordValid = ref<boolean>(true)

function checkValidation(alertDiv: HTMLElement, identifier: string, inputClassName: string) {
    if(alertDiv.innerHTML == "") {
        alertDiv.className = "ml-2 valid-feedback";
        alertDiv.innerHTML = "Valid " + identifier;
        (event?.target as HTMLElement).className = inputClassName +  " is-valid";

        return true
    } else {
        return false
    }
}

function changeAlertDivToInvalid(alertDiv: HTMLInputElement, inputClassName: string) {
    alertDiv.className = "ml-2 invalid-feedback";
    (event?.target as HTMLElement).className = inputClassName + " is-invalid";
}

function checkIfUsernameIsValid(inputClassName: string) {
    const div = username_validation_message.value

    if (!div) return false

    div.innerHTML = ""

    div.style.display = "block"
    if(username.value.trim().length <= 3 || username.value.trim().length > 12 || !(/^[A-zA-Z0-9]+$/.test(username.value))) {
        changeAlertDivToInvalid(div, inputClassName)
    
        if(username.value.trim().length < 3 || username.value.trim().length > 12) {
            div.innerHTML = "Invalid length, 3 - 12 characters <br>"
        }
        if(!(/^[A-zA-Z0-9]+$/.test(username.value)) && username.value.trim().length > 0) {
            div.innerHTML += "Only letters and numbers are allowed"
        }
    } 
    return checkValidation(div, 'username', inputClassName)
}

function checkIfPasswordIsValid(inputClassName: string) {
    const div = password_validation_message.value

    if (!div) return false

    div.innerHTML = ""

    div.style.display = "block"
    if(password.value.trim().length < 9 || password.value.trim().length > 50 || !(/(?=.*[@$£<`'^])/.test(password.value))) {
        changeAlertDivToInvalid(div, inputClassName)
        
        if(password.value.trim().length < 9 || password.value.trim().length > 50) {
            div.innerHTML = "Invalid length, 9 - 50 characters <br>"
        }

        if(!(/(?=.*[@$£<`'^:}])/.test(password.value)) && password.value.trim().length > 0) {
            div.innerHTML += "One special character is needed"
        }
    }
    return checkValidation(div, 'password', inputClassName)
}



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

        login_alert_message.value = result.message
        login_alert.value!.className = "alert alert-danger"

        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            console.log(response)
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
 
        console.log('successfully received token', result.token)

        localStorage.setItem('token', result.token)
        localStorage.setItem('user_id', result.user_id)

        console.log('Moving to home')
        router.push({ name: 'macroHome' });
            
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
                            <input @input="isUsernameValid = checkIfUsernameIsValid('form-control form-control-lg')" class="form-control form-control-lg" type="text" v-model="username" placeholder="Username" required>
                            <div ref="username_validation_message" class="ml-3 invalid-feedback" style="display: none;"></div>
                        </div>

                        <div class="form-group">
                            <input @input="isPasswordValid = checkIfPasswordIsValid('mt-2 form-control form-control-lg')" class="mt-2 form-control form-control-lg" type="password" v-model="password" placeholder="Password" required>
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