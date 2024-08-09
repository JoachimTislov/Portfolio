<script setup lang="ts">
import { checkValidationArr } from '@/Logic/MacroTracker/checkLogic/checkValidationArr';
import AlertBox from './AlertBox.vue';
import PasswordInput from './Modules/PasswordInput.vue';
import { change_password_validation } from '@/Logic/MacroTracker/initVariables';
import { _alert, alertDanger } from '@/Logic/MacroTracker/alertFunctions';
import { fetchResource, getFormDataInJSONFormat } from '@/Logic/MacroTracker/Ajax/ajax';
import { hideModal } from '@/Logic/MacroTracker/hideModal';

const password_inputs = [
    { name: 'old_password', label: 'Old' },
    { name: 'new_password', label: 'New' },
    { name: 'new_confirm_password', label: 'Repeat New' }
]

const modal_id = 'change_password_modal'

async function changePassword() {

    if (checkValidationArr(change_password_validation)) {
        try {
            const json = getFormDataInJSONFormat('passwords')
            const user_id = localStorage.getItem('user_id')
            const response = await fetchResource('PUT', json, `/password/${user_id}`, 'token')

            if (response && response.ok) {
                hideModal(modal_id)
            }

        } catch (error) {
            console.log(error)
            alert(`Network error: ${error}`)
        }
    } else {
        _alert('Fill out the password fields correctly')
        alertDanger()
    }
}

</script>


<template>
    <div class="modal fade Modal" :id="modal_id">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title m-2"> Change Password: </h3>
                    <button class="btn btn-lg ms-auto" data-bs-dismiss="modal">
                        <font-awesome-icon :icon="['fas', 'x']" />
                    </button>
                </div>

                <div class="modal-body">

                    <AlertBox />

                    <form id="passwords" @submit.prevent>
                        <template v-for="password_input in password_inputs" :key="password_input">

                            <PasswordInput :password_details="password_input" />

                        </template>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" @click="changePassword()" class="btn btn-success btn-lg ml-1">
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>