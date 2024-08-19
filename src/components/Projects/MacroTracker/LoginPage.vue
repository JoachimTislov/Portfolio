<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  validation_messages,
  login_validation,
  username,
  password,
  fetchingResource,
  showAlert,
  warningMessage
} from '@/Logic/MacroTracker/initVariables'
import { ValidateText } from '@/Logic/MacroTracker/validation'

import AlertBox from './Modules/AlertBox.vue'
import { onMounted } from 'vue'
import {
  _alert,
  alertDanger,
  alertSecondary,
  alertSuccess
} from '@/Logic/MacroTracker/alertFunctions'
import { fetchResource } from '@/Logic/MacroTracker/Ajax/ajax'
import { token } from '@/Logic/MacroTracker/token'
import RequestLoader from './RequestLoader.vue'
import router from '@/router'
import WarningModule from './Modules/WarningModule.vue'

onMounted(() => {
  if (!showAlert.value) {
    alertSecondary()
    _alert('Welcome to the login page')
  }
})

async function login() {
  if (login_validation.Password && login_validation.Username) {
    try {
      const json = JSON.stringify({
        username: username.value,
        password: password.value
      })

      const response = await fetchResource('POST', json, '/login', 'api_key')

      if (response) {
        const result: {
          message: string
          token: string
          user_id: string
          username: string
        } = await response.json()

        // Probably rework this underneath

        if (response.ok) {
          token.value = result.token

          localStorage.setItem('token', result.token)
          localStorage.setItem('user_id', result.user_id)
          localStorage.setItem('username', result.username)

          router.push({ name: 'macroHome' })

          alertSuccess()
        } else {
          alertDanger()
        }

        _alert(result.message)
      }
    } catch (error) {
      alert('Error loging in: ' + error)
    }
  } else {
    alertDanger()
    _alert('Fill out the login fields correctly!')
  }
}
</script>

<template>
  <div class="centerDiv">
    <div class="d-flex flex-column box">
      <WarningModule :message="warningMessage" />
      <div class="card p-3 border border-1 shadow-lg">
        <div class="card-body">
          <AlertBox />
          <h1 class="card-title">Macro Tracker</h1>

          <form @submit.prevent>
            <div class="form-group" style="width: 300px">
              <input
                @input="
                  login_validation.Username = ValidateText(
                    $event,
                    validation_messages.login.username.value,
                    'Username',
                    'form-control form-control-lg'
                  )
                "
                class="form-control form-control-lg"
                type="text"
                v-model="username"
                placeholder="Username"
                required
              />
              <div
                :ref="validation_messages.login.username"
                class="ml-3 invalid-feedback"
                style="display: none"
              ></div>
            </div>

            <div class="form-group" style="width: 300px">
              <input
                @input="
                  login_validation.Password = ValidateText(
                    $event,
                    validation_messages.login.password.value,
                    'Password',
                    'mt-2 form-control form-control-lg'
                  )
                "
                class="mt-2 form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
                required
              />
              <div
                :ref="validation_messages.login.password"
                class="ml-3 mb-1 invalid-feedback"
                style="display: none"
              ></div>
            </div>

            <div class="mt-3">
              <RouterLink class="btn btn-link" :to="{ name: 'macroRegister' }">
                Register an account
              </RouterLink>

              <div class="d-flex flex-row float-end">
                <template v-if="fetchingResource">
                  <RequestLoader />
                </template>

                <button type="submit" class="btn btn-lg btn-outline-primary" @click="login()">
                  Login
                </button>
              </div>
            </div>
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

  margin-top: 10vh;
}

.box {
  max-width: 400px;
  min-width: 330px;
}
</style>
