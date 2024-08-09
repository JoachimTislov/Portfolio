<script setup lang="ts">
import { onMounted } from 'vue';
import user_icon from '@/assets/Icons/user-icon.png'
import { initPicture, profilePictureUrl, _file, uploadedPicture, userInfo } from '@/Logic/MacroTracker/initVariables'
import { deleteProfilePicture } from '@/Logic/MacroTracker/Ajax/deleteProfilePicture'
import { uploadProfilePicture } from '@/Logic/MacroTracker/Ajax/uploadProfilePicture'
import AlertBox from './AlertBox.vue';
import { _alert, alertDanger } from '@/Logic/MacroTracker/alertFunctions';
import { getUserInfo } from '@/Logic/MacroTracker/Ajax/get/getUserInfo';
import ChangePassword from './ChangePassword.vue';

onMounted(async () => {
    initPicture()
})

if (!userInfo.value) await getUserInfo()

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

    <ChangePassword />

    <div class="card">

        <section class="card-body">

            <div class="profileContainer d-flex">

                <div class="d-flex flex-column mt-2 mb-2">
                    <img :src="profilePictureUrl" alt="Could not load your picture" class="mx-auto rounded">

                    <div class="imageUploadBar mt-2 input-group mx-auto">
                        <input type="file" class="form-control" id="pictureInput" @change="handleFileUpload">

                        <button v-if="profilePictureUrl != user_icon && !uploadedPicture" type="button"
                            class="btn btn-md btn-outline-success" @click="uploadProfilePicture(_file)">Upload</button>

                        <button v-if="profilePictureUrl != user_icon && uploadedPicture" type="button"
                            class="btn btn-md btn-outline-danger" @click="deleteProfilePicture()">Delete</button>
                    </div>
                </div>


                <div class="marginBox p-3 d-flex flex-column bg-secondary rounded" style="width: 100%">
                    <div class="d-flex p-1" v-for="(value, key) in userInfo" :key="key">
                        <em>
                            <h3> {{ key }}: </h3>
                        </em>

                        <h4 class="ms-auto"> {{ value }} <template v-if="key == 'Weight'"> kg </template> <template
                                v-if="key == 'Height'"> cm </template> <template v-if="key == 'Age'"> years old
                            </template>
                        </h4>
                    </div>
                </div>

            </div>

            <div class="d-flex">

                <div class="btn-group btn-group-lg mt-4 ms-auto">

                    <button type="button" class="btn btn-info" data-bs-toggle="modal"
                        data-bs-target="#change_password_modal">
                        Change password </button>
                    <button type="button" class="btn btn-success" data-bs-toggle="modal"
                        data-bs-target="#edit_profile_information_modal"> Edit
                        profile information </button>

                </div>
            </div>

        </section>

    </div>
</template>


<style scoped>
img,
.imageUploadBar {
    width: clamp(15rem, 28vw, 25rem);
    height: auto;
    object-fit: cover;
}

.marginBox {
    margin-left: 2.5rem;
    margin-right: 1rem;
}

@media (max-width: 770px) {
    .profileContainer {
        flex-direction: column;
    }

    img,
    .imageUploadBar {
        width: 50vw;
    }

    .marginBox {
        margin: 0
    }
}


h3,
h4 {
    color: rgb(206, 199, 192);
    font-size: clamp(1.2rem, 2.2vw, 2rem);
}
</style>
