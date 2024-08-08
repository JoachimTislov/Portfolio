<script setup lang="ts">
import { onMounted } from 'vue';
import user_icon from '@/assets/Icons/user-icon.png'
import { initPicture, profilePictureUrl, file } from '@/Logic/MacroTracker/initVariables'

import { deleteProfilePicture } from '@/Logic/MacroTracker/Ajax/deleteProfilePicture'
import { uploadProfilePicture } from '@/Logic/MacroTracker/Ajax/uploadProfilePicture'
import AlertBox from './AlertBox.vue';

onMounted(async () => {
    initPicture()
})

function handleFileUpload(event: Event) {
    console.log('Handling file upload')
    const input = event.target as HTMLInputElement

    file.value = input && input.files && input.files.length > 0 ? input.files[0] : undefined

    if ((window.URL || window.webkitURL) && file.value && URL.createObjectURL(file.value)) {

        profilePictureUrl.value = URL.createObjectURL(file.value)

    }

    if (!profilePictureUrl.value) {
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
                style="width: 150px; height: 150px; object-fit: cover;">
        </div>
        <div class="mt-2">
            <input type="file" class="input-group input-group-sm" id="pictureInput" @change="handleFileUpload">
            <div class="input-group-append mt-2">
                <h6> Select a picture </h6>
                <button type="button" class="btn btn-sm btn-outline-success"
                    @click="uploadProfilePicture(file)">Upload</button>
                <button v-if="profilePictureUrl != user_icon" type="button" class="btn btn-sm btn-outline-danger"
                    @click="deleteProfilePicture()">Delete</button>
            </div>
        </div>
    </section>
</template>
