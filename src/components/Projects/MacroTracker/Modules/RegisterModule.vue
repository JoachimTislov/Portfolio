<script setup lang="ts">
import { validateGenderOrActivityLvl } from '@/Logic/MacroTracker/validation';
import {
    user_validation_arr,
    validation_messages
} from '@/Logic/MacroTracker/initVariables';
import type { User_input_field, UserInfo } from '@/Logic/MacroTracker/types';
import { ref } from 'vue';
import RegisterInputModule from './RegisterInputModule.vue'

const props = defineProps<({
    user_info?: UserInfo
})>()

const _arr: User_input_field[] = [
    { inputType: 'text', placeholder: 'Username', validate_type: 'Username', identifier: 'Username', class: 'form-group' },
    { inputType: 'text', placeholder: 'Password', validate_type: 'Password', identifier: 'Password', class: 'form-group' },
    { inputType: 'text', placeholder: 'Repeat Password', validate_type: 'Password', identifier: 'Confirm_Password', class: 'form-group' },
    { inputType: 'text', placeholder: 'Name', validate_type: 'Name', identifier: 'Name', class: 'form-group' },
    { inputType: 'email', placeholder: 'Email', validate_type: 'Email', identifier: 'Email', class: 'input-group', attachment: '@', type: 'prepend' },
    { inputType: 'number', placeholder: 'Age', validate_type: 'Age', identifier: 'Age', class: 'input-group', attachment: 'years old', type: 'append' },
    { inputType: 'number', placeholder: 'Height', validate_type: 'Height', identifier: 'Height', class: 'input-group', attachment: 'cm', type: 'append' },
    { inputType: 'number', placeholder: 'Weight', validate_type: 'Weight', identifier: 'Weight', class: 'input-group', attachment: 'kg', type: 'append' },
]

const selectedGender = ref<string>('0')
const selectedActivity_lvl = ref<string>('0')

if (props.user_info) {

    for (const key of Object.keys(user_validation_arr)) {
        user_validation_arr[key] = true
    }

    // Removing password entries
    _arr.splice(1, 2)

    for (const entry of _arr) {
        entry.value = props.user_info[entry.identifier]
    }

    const activity_Levels: { [key: string]: string } = {
        'Sedentary': '1',
        'Lightly Active': '2',
        'Moderately Active': '3',
        'Very Active': '4',
        'Super Active': '5'
    }

    selectedGender.value = props.user_info.Gender == 'Male' ? '1' : '2'
    selectedActivity_lvl.value = activity_Levels[props.user_info['Activity lvl']]
}

</script>


<template>

    <template v-for="entry in _arr" :key="entry.identifier">
        <RegisterInputModule :user_input_field="entry" />
    </template>

    <div class="input-group mt-2">
        <select
            @change="user_validation_arr['isGenderValid'] = validateGenderOrActivityLvl($event, validation_messages.register.gender.value, 'Gender', 'form-control form-control-md')"
            class="form-control form-control-md" name="_gender" v-model="selectedGender" required>
            <option value="0"> Choose Gender </option>
            <option value="1"> Male </option>
            <option value="2"> Female </option>
        </select>
        <div class="d-flex input-group-append">
            <span class="input-group-text"><font-awesome-icon :icon="['fas', 'person-half-dress']" /></span>
        </div>
        <div :ref="validation_messages.register.gender" class="ml-2 invalid-feedback" style="display: none;">
        </div>
    </div>

    <div class="form-group mt-2">
        <select
            @change="user_validation_arr['isActivityLvlValid'] = validateGenderOrActivityLvl($event, validation_messages.register.activity_lvl.value, 'Activity Lvl', 'form-control form-control-md')"
            class="form-control form-control-md" name="_activity_lvl" v-model="selectedActivity_lvl" required>
            <option value="0"> Choose Activity Lvl </option>
            <option value="1"> Sedentary </option>
            <option value="2"> Lightly Active </option>
            <option value="3"> Moderately Active </option>
            <option value="4"> Very Active </option>
            <option value="5"> Super Active </option>
        </select>
        <div :ref="validation_messages.register.activity_lvl" class="ml-2 invalid-feedback" style="display: none;">
        </div>
    </div>

</template>