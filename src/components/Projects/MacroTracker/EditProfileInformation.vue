<script setup lang="ts">

import { hideModal } from '@/Logic/MacroTracker/hideModal';
import AlertBox from './AlertBox.vue';
import RegisterModule from './Modules/RegisterModule.vue';
import { userInfo } from '@/Logic/MacroTracker/initVariables';

const modal_id = 'edit_profile_information_modal'

async function edit_profile_information() {

}

</script>

<template>
    <div class="modal modal-md fade Modal" :id="modal_id">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title mr-2"> Edit Profile Information </h3>
                </div>

                <div class="modal-body">

                    <AlertBox />

                    <form id="edit_profile_information_form">

                        <RegisterModule :user_info="userInfo" />

                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger btn-lg ml-1" @click="hideModal(modal_id)"> Cancel </button>
                    <button type="submit" @click="edit_profile_information()" class="btn btn-success btn-lg ml-1">

                        Edit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>