<script setup lang="ts">
import router from '@/router';
import { onMounted, ref } from 'vue';

import user_icon from '@/assets/Icons/user-icon.png'

const alert_message = ref<string>('Hello fellow user')
const profilePictureUrl = ref<string>(user_icon)
const file = ref<File | undefined>(undefined)
const userInfo = ref<any | undefined>(undefined)

async function fetchResource(url: string) {
    const token = localStorage.getItem('token')
    if (!token) {
         router.push({ name: 'macroLogin'})
    } else {
        try {
            console.log('Fetching resource at: ', import.meta.env.VITE_LOCAL_API_WEB_URL + url)
            const response = await fetch(import.meta.env.VITE_LOCAL_API_WEB_URL + url, {
                headers: {
                    'Authorization': token 
                }
            });
            const data = await response.json();

            return data

        } catch (error) {
            console.log('Error loading user information:' + error);
            alert(`Network error: ${error}`)
        }
    }
} 

onMounted(async () => {
    userInfo.value = await fetchResource(`/user_info/${localStorage.getItem('user_id')}`)
    if (userInfo.value.profile_picture_link) profilePictureUrl.value = userInfo.value.profile_picture_link
})

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
        alert_message.value = "No file selected"
        //alertUserWithMessage('user_alert', "No file selected", "red")
        return;
    }

    try {
        console.log(file)
        const formData = new FormData();
        formData.append('file', file);
        
        const token = localStorage.getItem('token')

        if (!token) {
            return router.push({ name: 'macroLogin' })
        }

        /*await fetch('http://127.0.0.1:5000/profile_picture', {
            method: 'DELETE',
            headers: { 
                'Authorization': token
            },
        });*/

        const response = await fetch('http://127.0.0.1:5000/profile_picture', {
            method: 'POST',
            body: formData,
            headers: { 
                'Authorization': token
            },
        });

        console.log((await response.json()).message)

        if (response.status != 200) {
            console.log("Error when uploading picture.")
            //this.$root.alertUserWithMessage('user_alert', this.$root.cookie['Message'], "red")
            return false;
        }

        if (response.ok) {
           console.log('Uploaded picture')
            //this.$root.alertUserWithMessage('user_alert', this.$root.cookie['Message'], "green")
        }
    } catch (error) {
        console.error('Error when uploading profile picture: ', error);
    }
}


async function deleteProfilePicture() {  
    try {
        const token = localStorage.getItem('token')

        if (!token) {
            return router.push({ name: 'macroLogin' })
        }

        const response = await fetch('http://127.0.0.1:5000/profile_picture', {
            method: 'DELETE',
            headers: { 
                'Authorization': token
            },
        });

        if(!response.ok) {
            console.log("Error when deleting picture.")
            //this.$root.alertUserWithMessage('user_alert', this.$root.cookie['Message'], "red");
            return false;
        }
        
        if (response.ok) {
            console.log("Deleted picture.")
            //this.$root.load_user_info();
            //this.$root.alertUserWithMessage('user_alert', /* message */, "green");
            //file = null; 
        } 

    } catch (error) {
        console.error('Error deleting profile picture:', error);
    }
}




</script>

<template>

        <div id="alert_profile"> <h4> {{ alert_message }} </h4> </div>

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