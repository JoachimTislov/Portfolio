<script setup lang="ts">
import AlertBox from './Modules/AlertBox.vue'
import RegisterModule from './Modules/RegisterModule.vue'
import { user_validation_arr, userInfo } from '@/Logic/MacroTracker/initVariables'
import { getFormDataInJSONFormat } from '@/Logic/MacroTracker/Ajax/get/getFormDataInJSONFormat'
import { fetchResource } from '@/Logic/MacroTracker/Ajax/ajax'
import { checkValidationArr } from '@/Logic/MacroTracker/checkLogic/checkValidationArr'
import { _alert, alertDanger, hideAlert } from '@/Logic/MacroTracker/alertFunctions'
import { getUserInfo } from '@/Logic/MacroTracker/Ajax/get/getUserInfo'
import user_icon from '@/assets/Icons/user-icon.png'
import { uploadProfilePicture } from '@/Logic/MacroTracker/Ajax/uploadProfilePicture'
import { deleteProfilePicture } from '@/Logic/MacroTracker/Ajax/deleteProfilePicture'
import { _file, profilePictureUrl, uploadedPicture } from '@/Logic/MacroTracker/initVariables'

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
    await _alert('Fill out the required fields correctly!')
  }
}

async function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement

  _file.value = input && input.files && input.files.length > 0 ? input.files[0] : null

  if ((window.URL || window.webkitURL) && _file.value && URL.createObjectURL(_file.value)) {
    profilePictureUrl.value = URL.createObjectURL(_file.value)
  }

  if (!profilePictureUrl.value) {
    alertDanger()
    await _alert('URL.createObjectURL is not supported in this browser.')

    console.error('URL.createObjectURL is not supported in this browser.')
  }
}
</script>

<template>
  <div class="modal modal-md fade Modal" :id="modal_id">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title mr-2">Edit Profile</h3>
          <button class="btn btn-lg ms-auto" @click="hideAlert()" data-bs-dismiss="modal">
            <font-awesome-icon :icon="['fas', 'x']" />
          </button>
        </div>

        <div class="modal-body">
          <AlertBox />

          <form id="edit_profile_information_form" @submit.prevent>
            <RegisterModule :user_info="userInfo" />
          </form>

          <div class="d-flex flex-column mt-2 mb-2">
            <img :src="profilePictureUrl" style="width: 300px; height: auto" alt="Could not load your picture"
              class="mx-auto rounded" />

            <div class="imageUploadBar mt-2 input-group mx-auto">
              <input type="file" class="form-control" id="pictureInput" @change="handleFileUpload" />

              <button v-if="profilePictureUrl != user_icon && !uploadedPicture" type="button"
                class="btn btn-md btn-outline-success" @click="uploadProfilePicture(_file)">
                Upload
              </button>

              <button v-if="profilePictureUrl != user_icon && uploadedPicture" type="button"
                class="btn btn-md btn-outline-danger" @click="deleteProfilePicture()">
                Delete
              </button>
            </div>
          </div>
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
