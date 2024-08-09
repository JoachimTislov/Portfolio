<script setup lang="ts">
import { onMounted } from 'vue';
import user_icon from '@/assets/Icons/user-icon.png'
import { initPicture, profilePictureUrl, _file, uploadedPicture } from '@/Logic/MacroTracker/initVariables'


import { deleteProfilePicture } from '@/Logic/MacroTracker/Ajax/deleteProfilePicture'
import { uploadProfilePicture } from '@/Logic/MacroTracker/Ajax/uploadProfilePicture'
import AlertBox from './AlertBox.vue';
import { _alert, alertDanger } from '@/Logic/MacroTracker/alertFunctions';

onMounted(async () => {
    initPicture()
})

function handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement

    _file.value = input && input.files && input.files.length > 0 ? input.files[0] : null

    if ((window.URL || window.webkitURL) && _file.value && URL.createObjectURL(_file.value)) {

        profilePictureUrl.value = URL.createObjectURL(_file.value)

    }

    if (!profilePictureUrl.value) {
        _alert("URL.createObjectURL is not supported in this browser.")
        alertDanger()
        console.error("URL.createObjectURL is not supported in this browser.")
    }
}
</script>

<template>

    <AlertBox />

    <section class="card-body">
        <label for="pictureInput" class="form-label">
            <h5 class="card-title"> Your Profile Picture </h5>
        </label>
        <div class="mb-4">
            <img :src="profilePictureUrl" alt="Could not load your picture" class="rounded"
                style="width: 300px; height: 300px; object-fit: cover;">
        </div>
        <div class="mt-2 input-group" style="max-width: 300px;">
            <input type="file" class="form-control" id="pictureInput" @change="handleFileUpload">

            <button v-if="profilePictureUrl != user_icon && !uploadedPicture" type="button"
                class="btn btn-md btn-outline-success" @click="uploadProfilePicture(_file)">Upload</button>

            <button v-if="profilePictureUrl != user_icon && uploadedPicture" type="button"
                class="btn btn-md btn-outline-danger" @click="deleteProfilePicture()">Delete</button>
        </div>
    </section>
</template>
