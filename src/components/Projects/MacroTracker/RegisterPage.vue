<script setup lang="ts">
import { fetchResource, getFormDataInJSONFormat } from '@/Logic/MacroTracker/Ajax/ajax';
import { routeToPage } from '@/Logic/MacroTracker/routeToPage';
import { ValidateText, validateGenderOrActivityLvl } from '@/Logic/MacroTracker/validation';

import {
    validation_messages
} from '@/Logic/MacroTracker/initVariables';
import { onMounted, ref } from 'vue';
import { setElementReference } from '@/Logic/MacroTracker/setElementReference'
import { checkValidationArr } from '@/Logic/MacroTracker/checkLogic/checkValidationArr';

const register_alert = ref<HTMLElement | null>(null)

onMounted(() => {
    register_alert.value?.focus()
})

const validation_arr: { [key: string]: boolean } = {
    isUsernameValid: false,
    isPasswordValid: false,
    isConfirm_PasswordValid: false,
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

    const validation = checkValidationArr(validation_arr)

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

const _arr = [
    { inputType: 'text', placeholder: 'Username', validate_type: 'Username', identifier: 'Username', class: 'form-group' },
    { inputType: 'text', placeholder: 'Password', validate_type: 'Password', identifier: 'Password', class: 'form-group' },
    { inputType: 'text', placeholder: 'Repeat Password', validate_type: 'Password', identifier: 'Confirm_Password', class: 'form-group' },
    { inputType: 'text', placeholder: 'Name', validate_type: 'Name', identifier: 'Name', class: 'form-group' },
    { inputType: 'email', placeholder: 'Email', validate_type: 'Email', identifier: 'Email', class: 'input-group', attachment: '@', type: 'prepend' },
    { inputType: 'number', placeholder: 'Age', validate_type: 'Age', identifier: 'Age', class: 'input-group', attachment: 'years old', type: 'append' },
    { inputType: 'number', placeholder: 'Height', validate_type: 'Height', identifier: 'Height', class: 'input-group', attachment: 'cm', type: 'append' },
    { inputType: 'number', placeholder: 'Weight', validate_type: 'Weight', identifier: 'Weight', class: 'input-group', attachment: 'kg', type: 'append' },
]

</script>


<template>
    <div class="centerDiv">
        <div class="card" style="max-width: 550px">
            <div class="card-body">
                <div ref="register_alert" class="alert alert-dismissible alert-success">
                    <h4> Welcome to the register page </h4>
                </div>
                <h1 class="card-title"> Register: Macro Tracker </h1>
                <form id="register_form" @submit.prevent>

                    <template v-for="entry in _arr" :key="entry.identifier">
                        <div class="mt-1" :class="entry.class">
                            <div v-if="entry.type && entry.type == 'prepend'" :class="`input-group-${entry.type}`">
                                <span class="input-group-text"> {{ entry.attachment }} </span>
                            </div>
                            <input
                                @input="validation_arr[`is${entry.identifier}Valid`] = ValidateText($event, validation_messages.register[entry.identifier.toLocaleLowerCase()].value, entry.validate_type, 'form-control form-control-md')"
                                class="form-control form-control-md" :type="entry.inputType"
                                :placeholder="entry.placeholder" :name="entry.identifier" required>
                            <div v-if="entry.type && entry.type == 'append'" :class="`input-group-${entry.type}`">
                                <span class="input-group-text"> {{ entry.attachment }} </span>
                            </div>
                        </div>
                        <div :ref="el => setElementReference(el, validation_messages.register[entry.identifier.toLocaleLowerCase()])"
                            class="ml-2 invalid-feedback" style="display: none;"></div>
                    </template>

                    <div class="input-group mt-1">
                        <select
                            @change="validation_arr['isGenderValid'] = validateGenderOrActivityLvl($event, validation_messages.register.gender.value, 'Gender', 'form-control form-control-md')"
                            class="form-control form-control-md" name="_gender" required>
                            <option value="0" selected> Choose Gender </option>
                            <option value="1"> Male </option>
                            <option value="2"> Female </option>
                        </select>
                        <div class="d-flex input-group-append">
                            <span class="input-group-text"><font-awesome-icon
                                    :icon="['fas', 'person-half-dress']" /></span>
                        </div>
                        <div :ref="validation_messages.register.gender" class="ml-2 invalid-feedback"
                            style="display: none;">
                        </div>
                    </div>

                    <div class="form-group mt-1">
                        <select
                            @change="validation_arr['isActivityLvlValid'] = validateGenderOrActivityLvl($event, validation_messages.register.activity_lvl.value, 'Activity Lvl', 'form-control form-control-md')"
                            class="form-control form-control-md" name="_activity_lvl" required>
                            <option value="0" selected> Choose Activity Lvl </option>
                            <option value="1"> Sedentary </option>
                            <option value="2"> Lightly Active </option>
                            <option value="3"> Moderately Active </option>
                            <option value="4"> Very Active </option>
                            <option value="5"> Super Active </option>
                        </select>
                        <div :ref="validation_messages.register.activity_lvl" class="ml-2 invalid-feedback"
                            style="display: none;"></div>
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


<style scoped>
.centerDiv {
    display: flex;
    justify-content: center;

    margin-top: 15vh;
}
</style>