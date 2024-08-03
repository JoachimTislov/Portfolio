<script setup lang="ts">
import { ValidateText, validateGenderOrActivityLvl } from '@/Logic/MacroTracker/validation';

import { 
    register_username_validation_message, 
    register_activityLvl_validation_message,
    register_age_validation_message, 
    register_confirm_password_validation_message, 
    register_email_validation_message,
    register_gender_validation_message, 
    register_height_validation_message, 
    register_name_validation_message, 
    register_password_validation_message,
    register_weight_validation_message
 } from '@/Logic/MacroTracker/validation';
import { onMounted, ref } from 'vue';

const register_alert = ref<HTMLElement | null>(null)

onMounted(() => {
    register_alert.value?.focus()
})

const validation_arr =  {
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

</script>


<template>
    <div class="container">
        <div class="card mx-auto" style="max-width: 550px">
            <div class="card-body">
                <h1 class="card-title"> Register: Macro Tracker </h1>
                <form id="register_form" @submit.prevent>
                        <div class="form-group">
                            <input @input="validation_arr['isUsernameValid'] = ValidateText($event, register_username_validation_message, 'Username', 'form-control form-control-md')" class="form-control form-control-md" type="text" name="register_username" placeholder="Username" required>
                            <div ref="register_username_validation_message" class="ml-2 invalid-feedback" style="display: none;"></div>
                        </div>
                        <div class="form-group">
                            <input @input="validation_arr['isPasswordValid'] = ValidateText($event, register_password_validation_message, 'Password', 'form-control form-control-md')" class="form-control form-control-md" type="password" name="register_password" placeholder="Password" required>
                            <div ref="register_password_validation_message" class="ml-2 invalid-feedback" style="display: none;"></div>
                        </div>
                        <div class="form-group">    
                            <input @input="validation_arr['isConfirmPasswordValid'] = ValidateText($event, register_confirm_password_validation_message, 'Password', 'form-control form-control-md')" class="form-control form-control-md" type="password" name="confirm_password" placeholder="Repeat password" required>
                            <div ref="register_confirm_password_validation_message" class="ml-2 invalid-feedback" style="display: none;"></div>
                        </div>

                        
                        <div class="row">
                            <div class="col-6">
                                <select @change="validation_arr['isGenderValid'] = validateGenderOrActivityLvl($event, register_gender_validation_message, 'Gender', 'form-control form-control-md')" class="form-control form-control-md" name="_gender" required>
                                    <option value="0" selected> Choose Gender </option>
                                    <option value="1"> Male </option>
                                    <option value="2"> Female </option>
                                </select>
                                <div ref="register_gender_validation_message" class="ml-2 invalid-feedback" style="display: none;"></div>
                            </div>

                            <div class="form-group col-6">
                                <select @change="validation_arr['isActivityLvlValid'] = validateGenderOrActivityLvl($event, register_activityLvl_validation_message, 'Activity Lvl', 'form-control form-control-md')" class="form-control form-control-md" name="_activity_lvl" required>
                                    <option value="0" selected> Choose Activity Lvl </option>
                                    <option value="1"> Sedentary </option>
                                    <option value="2"> Lightly Active </option>
                                    <option value="3"> Moderately Active </option>
                                    <option value="4"> Very Active </option>
                                    <option value="5"> Super Active </option>
                                </select>
                                <div ref="register_activity_lvl_validation_message" class="ml-2 invalid-feedback" style="display: none;"></div>
                            </div>
                        </div>

                        <div class="form-group">
                            <input @input="validation_arr['isNameValid'] = ValidateText($event, register_name_validation_message, 'Name', 'form-control form-control-md')" class="form-control form-control-md" type="text" name="register_name" placeholder="Name" required>
                            <div ref="register_name_validation_message" class="ml-2 invalid-feedback" style="display: none;"></div>
                        </div>
                        <div class="form-group">
                            <input @input="validation_arr['isEmailValid'] = ValidateText($event, register_email_validation_message, 'Email', 'form-control form-control-md')" class="form-control form-control-md" type="email" name="register_email" placeholder="Email" required>
                            <div ref="register_email_validation_message" class="ml-2 invalid-feedback" style="display: none;"></div>
                        </div>
                        <div class="form-group">
                            <input @input="validation_arr['isAgeValid'] = ValidateText($event, register_age_validation_message, 'Age', 'form-control form-control-md')" class="form-control form-control-md" type="number" name="register_age" placeholder="Age" required>
                            <div ref="register_age_validation_message" class="ml-2 invalid-feedback" style="display: none;"></div>
                        </div>
                        <div class="form-group">
                            <input @input="validation_arr['isHeightValid'] = ValidateText($event, register_height_validation_message, 'Height', 'form-control form-control-md')" class="form-control form-control-md" type="number" name="register_height" placeholder="Height in cm" required> 
                            <div ref="register_height_validation_message" class="ml-2 invalid-feedback" style="display: none;"></div>
                        </div>
                        <div class="form-group">
                            <input @input="validation_arr['isWeightValid'] = ValidateText($event, register_weight_validation_message, 'Weight', 'form-control form-control-md')" class="form-control form-control-md" type="number" name="register_weight" placeholder="Weight in kg" required> 
                            <div ref="register_weight_validation_message" class="ml-2 invalid-feedback" style="display: none;"></div>
                        </div>

                    
                    <div ref="register_alert" class="alert alert-dismissible alert-danger" style="display: none;"></div>
                        
                    <div class="form-group">
                        <RouterLink :to="{ name: 'macroLogin' }">
                            Login
                        </RouterLink>
                    </div>
                    
                    <div form-group>
                        <button type="submit" class="btn btn-lg btn-outline-primary btn-block" @click="console.log('Register')"> Register </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>




</style>