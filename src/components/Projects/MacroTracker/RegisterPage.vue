<script setup lang="ts">
import { fetchResource, getFormDataInJSONFormat } from '@/Logic/MacroTracker/Ajax/ajax';
import { routeToPage } from '@/Logic/MacroTracker/routeToPage';
import { ValidateText, validateGenderOrActivityLvl } from '@/Logic/MacroTracker/validation';

import {
    register_username_validation_message,
    register_activity_lvl_validation_message,
    register_age_validation_message,
    register_confirm_password_validation_message,
    register_email_validation_message,
    register_gender_validation_message,
    register_height_validation_message,
    register_name_validation_message,
    register_password_validation_message,
    register_weight_validation_message
} from '@/Logic/MacroTracker/initVariables';
import { onMounted, ref } from 'vue';

const register_alert = ref<HTMLElement | null>(null)

onMounted(() => {
    register_alert.value?.focus()
})

const validation_arr: { [key: string]: boolean } = {
    isUsernameValid: false,
    isPasswordValid: false,
    isConfirmPasswordValid: false,
    isGenderValid: false,
    isActivityLvlValid: false,
    isEmailValid: false,
    isWeightValid: false,
    isHeightValid: false,
    isAgeValid: false,
    isNameValid: false
}

async function register() {
    console.log('Attempting to register')

    const validation = checkValidationArr()


    console.log(validation_arr, validation)

    if (validation) {
        const json = getFormDataInJSONFormat('register_form')
        const response = await fetchResource('POST', json, '/register', register_alert.value, 'api_key')

        if (response && response.ok) {
            console.log('successfully registered account')
            console.log('Moving to login')
            return routeToPage('macroLogin')
        }
    }
}

function checkValidationArr() {
    for (const key of Object.keys(validation_arr)) {
        if (validation_arr[key] === false) {
            return false
        }
    }
    return true
}

</script>


<template>
    <div class="container">
        <div class="card mx-auto" style="max-width: 550px">
            <div class="card-body">
                <div ref="register_alert" class="alert alert-dismissible alert-success">
                    <h4> Welcome to the register page </h4>
                </div>
                <h1 class="card-title"> Register: Macro Tracker </h1>
                <form id="register_form" @submit.prevent>
                    <div class="form-group">
                        <input
                            @input="validation_arr['isUsernameValid'] = ValidateText($event, register_username_validation_message, 'Username', 'form-control form-control-md')"
                            class="form-control form-control-md" type="text" name="register_username"
                            placeholder="Username" required>
                        <div ref="register_username_validation_message" class="ml-2 invalid-feedback"
                            style="display: none;"></div>
                    </div>
                    <div class="form-group">
                        <input
                            @input="validation_arr['isPasswordValid'] = ValidateText($event, register_password_validation_message, 'Password', 'form-control form-control-md')"
                            class="form-control form-control-md" type="password" name="register_password"
                            placeholder="Password" required>
                        <div ref="register_password_validation_message" class="ml-2 invalid-feedback"
                            style="display: none;"></div>
                    </div>
                    <div class="form-group">
                        <input
                            @input="validation_arr['isConfirmPasswordValid'] = ValidateText($event, register_confirm_password_validation_message, 'Password', 'form-control form-control-md')"
                            class="form-control form-control-md" type="password" name="confirm_password"
                            placeholder="Repeat password" required>
                        <div ref="register_confirm_password_validation_message" class="ml-2 invalid-feedback"
                            style="display: none;"></div>
                    </div>


                    <div class="input-group">
                        <select
                            @change="validation_arr['isGenderValid'] = validateGenderOrActivityLvl($event, register_gender_validation_message, 'Gender', 'form-control form-control-md')"
                            class="form-control form-control-md" name="_gender" required>
                            <option value="0" selected> Choose Gender </option>
                            <option value="1"> Male </option>
                            <option value="2"> Female </option>
                        </select>
                        <div class="d-flex input-group-append">
                            <span class="input-group-text"><font-awesome-icon
                                    :icon="['fas', 'person-half-dress']" /></span>
                        </div>
                        <div ref="register_gender_validation_message" class="ml-2 invalid-feedback"
                            style="display: none;">
                        </div>
                    </div>

                    <div class="form-group">
                        <select
                            @change="validation_arr['isActivityLvlValid'] = validateGenderOrActivityLvl($event, register_activity_lvl_validation_message, 'Activity Lvl', 'form-control form-control-md')"
                            class="form-control form-control-md" name="_activity_lvl" required>
                            <option value="0" selected> Choose Activity Lvl </option>
                            <option value="1"> Sedentary </option>
                            <option value="2"> Lightly Active </option>
                            <option value="3"> Moderately Active </option>
                            <option value="4"> Very Active </option>
                            <option value="5"> Super Active </option>
                        </select>
                        <div ref="register_activity_lvl_validation_message" class="ml-2 invalid-feedback"
                            style="display: none;"></div>
                    </div>

                    <div class="form-group">
                        <input
                            @input="validation_arr['isNameValid'] = ValidateText($event, register_name_validation_message, 'Name', 'form-control form-control-md')"
                            class="form-control form-control-md" type="text" name="register_name" placeholder="Name"
                            required>
                        <div ref="register_name_validation_message" class="ml-2 invalid-feedback"
                            style="display: none;"></div>
                    </div>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">@</span>
                        </div>
                        <input
                            @input="validation_arr['isEmailValid'] = ValidateText($event, register_email_validation_message, 'Email', 'form-control form-control-md')"
                            class="form-control form-control-md" type="email" name="register_email" placeholder="Email"
                            required>
                        <div ref="register_email_validation_message" class="ml-2 invalid-feedback"
                            style="display: none;"></div>
                    </div>
                    <div class="input-group">
                        <input
                            @input="validation_arr['isAgeValid'] = ValidateText($event, register_age_validation_message, 'Age', 'form-control form-control-md')"
                            class="form-control form-control-md" type="number" name="register_age" placeholder="Age"
                            required>
                        <div class="input-group-append">
                            <span class="input-group-text">years</span>
                        </div>
                        <div ref="register_age_validation_message" class="ml-2 invalid-feedback" style="display: none;">
                        </div>
                    </div>
                    <div class="input-group">
                        <input
                            @input="validation_arr['isHeightValid'] = ValidateText($event, register_height_validation_message, 'Height', 'form-control form-control-md')"
                            class="form-control form-control-md" type="number" name="register_height"
                            placeholder="Height in cm" required>
                        <div class="input-group-append">
                            <span class="input-group-text">cm</span>
                        </div>
                        <div ref="register_height_validation_message" class="ml-2 invalid-feedback"
                            style="display: none;">
                        </div>
                    </div>
                    <div class="input-group">
                        <input
                            @input="validation_arr['isWeightValid'] = ValidateText($event, register_weight_validation_message, 'Weight', 'form-control form-control-md')"
                            class="form-control form-control-md" type="number" name="register_weight"
                            placeholder="Weight in kg" required>
                        <div class="input-group-append">
                            <span class="input-group-text">kg</span>
                        </div>
                        <div ref="register_weight_validation_message" class="ml-2 invalid-feedback"
                            style="display: none;">
                        </div>
                    </div>

                    <RouterLink class="m-2" :to="{ name: 'macroLogin' }">
                        Login
                    </RouterLink>

                    <br>

                    <button type="submit" class="btn btn-lg btn-outline-primary btn-block" @click="register()"> Register
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
