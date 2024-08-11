<script setup lang="ts">
import user_icon from '@/assets/Icons/user-icon.png'
import { profilePictureUrl, _file, uploadedPicture, userInfo, initPicture, recommended_nutrient_data } from '@/Logic/MacroTracker/initVariables'
import { deleteProfilePicture } from '@/Logic/MacroTracker/Ajax/deleteProfilePicture'
import { uploadProfilePicture } from '@/Logic/MacroTracker/Ajax/uploadProfilePicture'
import AlertBox from './AlertBox.vue';
import { _alert, alertDanger } from '@/Logic/MacroTracker/alertFunctions';
import ChangePassword from './ChangePassword.vue';
import EditProfileInformation from './EditProfileInformation.vue';
import { hideAlert } from '@/Logic/MacroTracker/alertFunctions';
import { onMounted, reactive } from 'vue';
import { getUserInfo } from '@/Logic/MacroTracker/Ajax/get/getUserInfo';

onMounted(async () => {
    await getUserInfo()
    await initPicture()
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

const macros_recommendation_data = reactive({
    series: [{
        name: 'Recommended nutrient/macro consumption',
        data: recommended_nutrient_data
    }],
    options: {
        chart: {
            type: 'bar',
            foreColor: '#fff'
        },
        xaxis: {
            categories: ['Calories', 'Protein', 'Carbohydrates', 'Fat', 'Sugar'],
            labels: {
                style: {
                    fontSize: '12px',
                }
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                borderRadiusApplication: 'end',
                horizontal: true,
            }
        },
        tooltip: {
            theme: 'dark'  // Tooltip theme set to dark
        },
        dataLabels: {
            enabled: true,
            total: {
                enabled: true,
                style: {
                    color: '#373d3f',
                    fontSize: '40px',
                    fontFamily: undefined,
                    fontWeight: 600
                }
            }
        },
        title: {
            style: {
                fontSize: '15px'
            },
            text: 'Recommended Daily Nutrient Intake',
            align: 'center',
        },
        toolbar: {
            show: false,
            menu: {
                item: {
                    colors: ''
                }
            }
        },
    }
})


</script>

<template>

    <AlertBox />

    <ChangePassword />

    <EditProfileInformation />

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

                        <h4 class="ms-auto">
                            {{ value }}
                            <template v-if="key == 'Weight'"> kg </template>
                            <template v-if="key == 'Height'"> cm </template>
                            <template v-if="key == 'Age'"> years old </template>
                        </h4>
                    </div>
                </div>

            </div>

            <div class="mt-3">

                <apexchart :options="macros_recommendation_data.options" :series="macros_recommendation_data.series">
                </apexchart>

            </div>

            <div class="d-flex">
                <div class="btn-group btn-group-lg mt-4 ms-auto">

                    <button type="button" class="btn btn-info" data-bs-toggle="modal"
                        data-bs-target="#change_password_modal" @click="hideAlert()">
                        Change password </button>
                    <button type="button" class="btn btn-success" data-bs-toggle="modal"
                        data-bs-target="#edit_profile_information_modal" @click="hideAlert()"> Edit
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
