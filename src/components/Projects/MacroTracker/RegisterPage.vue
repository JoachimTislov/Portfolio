<script setup lang="ts">
import { fetchResource } from '@/Logic/MacroTracker/Ajax/ajax';
import { getFormDataInJSONFormat } from '@/Logic/MacroTracker/Ajax/get/getFormDataInJSONFormat';
import {
    fetchingResource,
    user_validation_arr, warningMessage
} from '@/Logic/MacroTracker/initVariables';
import { onMounted } from 'vue';
import { checkValidationArr } from '@/Logic/MacroTracker/checkLogic/checkValidationArr';
import AlertBox from './Modules/AlertBox.vue';
import { _alert, alertDanger, alertSecondary, alertSuccess } from '@/Logic/MacroTracker/alertFunctions';
import RegisterModule from './Modules/RegisterModule.vue';
import RequestLoader from './RequestLoader.vue';
import router from '@/router';
import WarningModule from './Modules/WarningModule.vue';

onMounted(() => {
    alertSecondary()
    _alert('Welcome to register page')
})

async function register() {
    const validation = checkValidationArr(user_validation_arr)

    if (validation) {
        const json = getFormDataInJSONFormat('register_form')
        const response = await fetchResource('POST', json, '/register', 'api_key')

        fetchingResource.value = false

        if (response && response.ok) {
            alertSuccess()
            _alert('Successfully registered account')

            router.push({ name: 'macroLogin' })
        }
    } else {
        _alert('Fill out the required fields correctly!')
        alertDanger()
    }
}

</script>


<template>

    <div class="centerDiv">
        <div class="d-flex flex-column" style="max-width: 400px; min-width: 260px;">
            <WarningModule :message="warningMessage" />
            <div class="card p-3 border border-1 shadow-lg" style="max-width: 500px; min-width: 300px">
                <div class="card-body">

                    <AlertBox />

                    <h2 class="card-title"> Macro Tracker - Register: </h2>
                    <form id="register_form" @submit.prevent>

                        <RegisterModule />

                        <div class="d-flex flex-row float-end">

                            <template v-if="fetchingResource">

                                <RequestLoader />

                            </template>

                            <button type="submit" class="btn btn-lg btn-outline-primary m-2 me-0" @click="register()">
                                Register
                            </button>
                        </div>

                        <h4 class="mt-4 ms-1">
                            <RouterLink :to="{ name: 'macroLogin' }">
                                Login
                            </RouterLink>
                        </h4>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.centerDiv {
    display: flex;
    justify-content: center;

    margin-top: 7vh;
}

h2 {
    font-size: clamp(1.5rem, 1.5vw, 2rem);
}
</style>