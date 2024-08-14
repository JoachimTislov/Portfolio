<script setup lang="ts">

import AlertBox from './Modules/AlertBox.vue';
import RegisterModule from './Modules/RegisterModule.vue';
import { user_validation_arr, userInfo } from '@/Logic/MacroTracker/initVariables';
import { getFormDataInJSONFormat } from '@/Logic/MacroTracker/Ajax/get/getFormDataInJSONFormat';
import { fetchResource } from '@/Logic/MacroTracker/Ajax/ajax';
import { checkValidationArr } from '@/Logic/MacroTracker/checkLogic/checkValidationArr';
import { _alert, alertDanger, hideAlert } from '@/Logic/MacroTracker/alertFunctions';
import { getUserInfo } from '@/Logic/MacroTracker/Ajax/get/getUserInfo';

const modal_id = 'edit_profile_information_modal'

async function edit_profile_information() {

    const validation = checkValidationArr(user_validation_arr)

    if (validation) {
        const json = getFormDataInJSONFormat('edit_profile_information_form')
        const response = await fetchResource('PUT', json, '/user_info', 'token', modal_id)

        if (response && response.ok) {
            await getUserInfo()
        }
    } else {
        alertDanger()
        _alert('Fill out the required fields correctly!')
    }
}

</script>

<template>
    <div class="modal modal-sm fade Modal" :id="modal_id">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title mr-2"> Edit Profile Information </h5>
                    <button class="btn btn-lg ms-auto" @click="hideAlert()" data-bs-dismiss="modal">
                        <font-awesome-icon :icon="['fas', 'x']" />
                    </button>
                </div>

                <div class="modal-body">

                    <AlertBox />

                    <form id="edit_profile_information_form" @submit.prevent>

                        <RegisterModule :user_info="userInfo" />

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" @click="edit_profile_information()" class="btn btn-success btn-lg">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>