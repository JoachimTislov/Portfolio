<script setup lang="ts">
import { fetchResource } from '@/Logic/MacroTracker/Ajax/ajax'
import { getFormDataInJSONFormat } from '@/Logic/MacroTracker/Ajax/get/getFormDataInJSONFormat'
import {
  fetchingResource,
  user_validation_arr,
  warningMessage
} from '@/Logic/MacroTracker/initVariables'
import { onMounted } from 'vue'
import { checkValidationArr } from '@/Logic/MacroTracker/checkLogic/checkValidationArr'
import AlertBox from './Modules/AlertBox.vue'
import {
  _alert,
  alertDanger,
  alertSecondary,
  alertSuccess
} from '@/Logic/MacroTracker/alertFunctions'
import RegisterModule from './Modules/RegisterModule.vue'
import RequestLoader from './RequestLoader.vue'
import router from '@/router'
import WarningModule from './Modules/WarningModule.vue'

onMounted(() => {
  alertSecondary()
  _alert('Welcome to the register page')
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
    alertDanger()
    _alert('Fill out the required fields correctly!')
  }
}
</script>

<template>
  <div class="centerDiv">
    <div class="d-flex flex-column box">
      <WarningModule :message="warningMessage" />
      <div class="card p-3 shadow-lg">
        <div class="card-body d-flex flex-column justify-content-center">
          <AlertBox />

          <h4 class="card-title">Macro Tracker - Register</h4>
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

            <h5 class="mt-4 ms-2 mb-1">
              <RouterLink :to="{ name: 'macroLogin' }"> Login </RouterLink>
            </h5>
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
  align-items: center;

  height: 80vh;
}

.box {
  max-width: 400px;
  min-width: 300px;
}
</style>
