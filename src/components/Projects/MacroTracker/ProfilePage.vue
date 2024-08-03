<script setup lang="ts">
import { onMounted, ref } from 'vue';
import user_icon from '@/assets/Icons/user-icon.png'
import { token } from '@/Logic/MacroTracker/token';
import { fetchResource } from '@/Logic/MacroTracker/ajax';
import { routeToLogin } from '@/Logic/MacroTracker/routeToLogin';

const profile_alert = ref<HTMLElement | null>(null)
const profilePictureUrl = ref<string>(user_icon)
const file = ref<File | undefined>(undefined)
//const userInfo = ref<any | undefined>(undefined)

onMounted(async () => {
    //userInfo.value = await fetchResource('/user_info/')
    profile_alert.value?.focus()
    initPicture()
})

async function initPicture() {
    const imageUrl = localStorage.getItem('imageUrl')

    const user_id = localStorage.getItem('user_id')

    if (!user_id) return routeToLogin()
    
    if (imageUrl) {
        profilePictureUrl.value = imageUrl
    } else {
        const response = await fetchResource('GET', '', `/user_picture/${user_id}`, profile_alert.value, token.value)

        if (response) {
            const blob = await response.blob()
            const userPictureURL = URL.createObjectURL(blob)

            localStorage.setItem('imageUrl', userPictureURL)

            console.log(userPictureURL)
            if (userPictureURL) profilePictureUrl.value = userPictureURL
        }
    }
}

function handleFileUpload(event: Event) {
    console.log('Handling file upload')
    const input = event.target as HTMLInputElement

    file.value = input && input.files && input.files.length > 0 ? input.files[0] : undefined

    if ((window.URL || window.webkitURL) && file.value && URL.createObjectURL(file.value)) profilePictureUrl.value = URL.createObjectURL(file.value)
    
    if (!profilePictureUrl.value) {
        console.error("URL.createObjectURL is not supported in this browser.")
    }
}

async function uploadProfilePicture(file: File | undefined) {
    console.log('Uploading picture')
    if (!file) {
        console.log('File does not exist')
        if (profile_alert.value) profile_alert.value.innerHTML = "No file selected"
        //alertUserWithMessage('user_alert', "No file selected", "red")
        return;
    }

    try {
        const json = JSON.stringify({ 'file': file})
        const response = await fetchResource('POST', json, '/profile', profile_alert.value, token.value)
        
        await deleteProfilePicture()

        if (response) {
            if (response.status != 200) {
                console.log("Error when uploading picture.")
                //this.$root.alertUserWithMessage('user_alert', this.$root.cookie['Message'], "red")
                return false;
            }

            if (response.ok) {
                console.log('Uploaded picture')
                initPicture() 
                //this.$root.alertUserWithMessage('user_alert', this.$root.cookie['Message'], "green")
            }
        }

    } catch (error) {
        console.error('Error when uploading profile picture: ', error);
    }
}


async function deleteProfilePicture() {  
    try {

        const response = await fetchResource('DELETE', '', '/profile_picture', profile_alert.value, token.value)

        if (response) {
            if(!response.ok) {
                console.log("Error when deleting picture.")
                //this.$root.alertUserWithMessage('user_alert', this.$root.cookie['Message'], "red");
                return false;
            }
            
            if (response.ok) {
                profilePictureUrl.value = user_icon
                localStorage.removeItem('imageUrl')
                console.log("Deleted picture.")
                //this.$root.load_user_info();
                //this.$root.alertUserWithMessage('user_alert', /* message */, "green");
                //file = null; 
            } 
        }
       
    } catch (error) {
        console.error('Error deleting profile picture:', error);
    }
}

</script>

<template>
    <div ref="profile_alert"></div>
    <section class="card-body">
        <label for="pictureInput" class="form-label"> 
            <h5 class="card-title"> Your Profile Picture </h5> 
            </label>
        <div class="mb-4">
            <img :src="profilePictureUrl" alt="Could not load your picture" class="rounded" style="width: 150px; height: 150px; object-fit: cover;">
        </div>
        <div class ="mt-2">
            <input type="file" class="input-group input-group-sm" id="pictureInput" @change="handleFileUpload">
            <div class="input-group-append mt-2">
                <h6> Select a picture </h6>
                <button type="button" class="btn btn-sm btn-outline-success" @click="uploadProfilePicture(file)">Upload</button>
                <button v-if="profilePictureUrl != user_icon" type="button" class="btn btn-sm btn-outline-danger" @click="deleteProfilePicture()">Delete</button>
            </div>
        </div>
    </section>   
</template>

<style scoped>



</style>