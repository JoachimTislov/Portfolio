<script setup lang="ts">
import { fetchResource } from '@/Logic/MacroTracker/Ajax/ajax';
import { getFormDataInJSONFormat } from '@/Logic/MacroTracker/Ajax/get/getFormDataInJSONFormat';
import { routeToPage } from '@/Logic/MacroTracker/routeToPage';
import {
    user_validation_arr
} from '@/Logic/MacroTracker/initVariables';
import { onMounted } from 'vue';
import { checkValidationArr } from '@/Logic/MacroTracker/checkLogic/checkValidationArr';
import AlertBox from './AlertBox.vue';
import { _alert, alertDanger, alertSecondary, alertSuccess } from '@/Logic/MacroTracker/alertFunctions';
import RegisterModule from './Modules/RegisterModule.vue';

onMounted(() => {
    _alert('Welcome to register page')
    alertSecondary()
})

async function register() {
    const validation = checkValidationArr(user_validation_arr)

    console.log(user_validation_arr)

    if (validation) {
        const json = getFormDataInJSONFormat('register_form')
        const response = await fetchResource('POST', json, '/register', 'api_key')

        if (response && response.ok) {
            alertSuccess(); _alert('Successfully registered account')
            routeToPage('macroLogin')
        }
    } else {
        alertDanger(); _alert('Fill out the required fields correctly!')
    }
}

</script>


<template>


    <div class="centerDiv">
        <div class="card p-3 border border-1 shadow-lg">
            <div class="card-body">

                <AlertBox />

                <h2 class="card-title"> Macro Tracker - Register: </h2>
                <form id="register_form" @submit.prevent>

                    <RegisterModule />

                    <button type="submit" class="btn btn-lg btn-outline-primary float-end m-2" @click="register()">
                        Register
                    </button>

                    <h4 class="mt-3">
                        <RouterLink :to="{ name: 'macroLogin' }">
                            Login
                        </RouterLink>
                    </h4>
                </form>
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
</style>