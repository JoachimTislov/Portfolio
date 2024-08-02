<script setup lang="ts">
import router from '@/router';
import { onMounted, ref } from 'vue';
import user_icon from '@/assets/Icons/user-icon.png'
import { token } from '@/Logic/MacroTracker/token';

const alert_message = ref<string>('Hello fellow user')
const profilePictureUrl = ref<string>(user_icon)
const file = ref<File | undefined>(undefined)
//const userInfo = ref<any | undefined>(undefined)

async function fetchResource(url: string) {
    if (!token.value) {
         router.push({ name: 'macroLogin'})
    } else {
        const user_id = localStorage.getItem('user_id')

        try {
            console.log('Fetching resource at: ', import.meta.env.VITE_LOCAL_API_WEB_URL + url + user_id)
            const response = await fetch(import.meta.env.VITE_LOCAL_API_WEB_URL + url + user_id, {
                headers: {
                    'Authorization': token.value
                }
            });
            
            if (!response.ok) {
                const message = (await response.json()).message;
                console.log(message)
            } else if (response.status == 401) {
                localStorage.removeItem('token')
                router.push({ name: 'macroLogin'})
            } else {

                const blob = await response.blob()

                const imageUrl = URL.createObjectURL(blob)

                localStorage.setItem('imageUrl', imageUrl)

                return imageUrl
            }
        } catch(Error) {
            console.log('Fetch failed: ', Error)
        }
    
    }
} 

onMounted(async () => {
    //userInfo.value = await fetchResource('/user_info/')
    initPicture()
})

async function initPicture() {
    const imageUrl = localStorage.getItem('imageUrl')
    
    if (imageUrl) {
        profilePictureUrl.value = imageUrl
    } else {
        const userPictureURL = await fetchResource('/user_picture/')
        console.log(userPictureURL)
        if (userPictureURL) profilePictureUrl.value = userPictureURL
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
        alert_message.value = "No file selected"
        //alertUserWithMessage('user_alert', "No file selected", "red")
        return;
    }

    try {
        console.log(file)
        const formData = new FormData();
        formData.append('file', file);
        
        if (!token.value) {
            return router.push({ name: 'macroLogin' })
        }

        await deleteProfilePicture()

        const response = await fetch('http://127.0.0.1:5000/profile_picture', {
            method: 'POST',
            body: formData,
            headers: { 
                'Authorization': token.value
            },
        });

        console.log((await response.json()).message)

        if (response.status == 401) {
            router.push({ name: 'macroLogin'})
        }

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
    } catch (error) {
        console.error('Error when uploading profile picture: ', error);
    }
}


async function deleteProfilePicture() {  
    try {
        if (!token.value) {
            return router.push({ name: 'macroLogin' })
        } 

        const response = await fetch('http://127.0.0.1:5000/profile_picture', {
            method: 'DELETE',
            headers: { 
                'Authorization': token.value
            },
        });

        if (response.status == 401) {
            router.push({ name: 'macroLogin'})
        }

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