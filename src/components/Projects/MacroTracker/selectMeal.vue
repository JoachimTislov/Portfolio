<script setup lang="ts">
import { days_of_the_week_with_date, schedule } from '@/Data/MacroTracker';
import { fetchResource } from '@/Logic/MacroTracker/Ajax/ajax';
import { getMeals } from '@/Logic/MacroTracker/Ajax/get/getMeals';
import { get_meals_for_given_date } from '@/Logic/MacroTracker/Ajax/get/getMealsForGivenDate';
import { check_if_number_is_less_than_10 } from '@/Logic/MacroTracker/checkLogic/check_if_number_is_less_than_10';
import { hideModal } from '@/Logic/MacroTracker/hideModal';
import { day_for_chosenDate, calender_date, meals } from '@/Logic/MacroTracker/initVariables';
import { ValidateText } from '@/Logic/MacroTracker/validation';
import { onMounted, ref, type Ref } from 'vue';
import AlertBox from './AlertBox.vue';
import { _alert, alertDanger } from '@/Logic/MacroTracker/alertFunctions';

const date = new Date()

const minutes = ref<number>(date.getMinutes())
const hour = ref<number>(date.getHours())
const selectedMealTime = ref<string>("Choose meal period")
const isHourValid = ref<boolean>(true)
const isMinutesValid = ref<boolean>(true)

const modal_id = 'select_meal_modal'

if (!meals.value) { await getMeals() }

const timeValidation: { [key: string]: Ref<HTMLElement | null> } = {

    hour: ref<HTMLElement | null>(null),
    minutes: ref<HTMLElement | null>(null),

    hoursInput: ref<HTMLElement | null>(null),
    minutesInput: ref<HTMLElement | null>(null),
}

const elementsToUpdate = [
    { element: timeValidation.minutes.value, action: (el: HTMLElement) => el.style.display = "none" },
    { element: timeValidation.hour.value, action: (el: HTMLElement) => el.style.display = "none" },
    { element: timeValidation.hoursInput.value, action: (el: HTMLElement) => el.className = "form-control form-control-md is-valid" },
    { element: timeValidation.minutesInput.value, action: (el: HTMLElement) => el.className = "form-control form-control-md is-valid" }
];

onMounted(() => {
    for (const key of Object.keys(timeValidation)) {
        timeValidation[key].value?.focus()
    }
})

function modifyTime() {
    for (const [key, time] of Object.entries(schedule)) {
        if (selectedMealTime.value == key) {
            hour.value = time.Start
            minutes.value = 0 // optional

            isHourValid.value = true
            isMinutesValid.value = true

            elementsToUpdate.forEach(({ element, action }) => {
                if (element) action(element);
            })
        }
    }
}

function updateTime() {
    for (const [key, time] of Object.entries(schedule)) {
        if (hour.value >= time.Start && hour.value <= time.End) {
            selectedMealTime.value = key
        }
    }
}

async function addMealToGivenDate(meal_id: number) {
    if (isHourValid.value && isMinutesValid.value) {
        try {
            const time = `${check_if_number_is_less_than_10(hour.value)}:${check_if_number_is_less_than_10(minutes.value)}`
            const dayOfWeek = (new Date().getDay())
            const index = dayOfWeek == 6 ? 0 : dayOfWeek - 1
            const date = days_of_the_week_with_date.value[index].Date

            const json = JSON.stringify({ "id": meal_id, "date": date, "time": time })
            const response = await fetchResource('POST', json, '/calender', 'token')

            if (response && response.ok) {

                await get_meals_for_given_date()
                hideModal(modal_id)

            }
        } catch (error) {
            alert(`Network error: ${error}`)
        }
    } else {
        alertDanger(); _alert('Time input is invalid')
    }
}

</script>

<template>
    <div class="modal fade Modal" :id="modal_id">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title ml-1 mt-2"> Select meal for {{ day_for_chosenDate }}, {{ calender_date }}:
                    </h4>
                </div>

                <div class="modal-body">
                    <div class="m-4" v-if="meals && meals.length > 0">

                        <AlertBox />

                        <form id="meal_date_info">

                            <h5> Input the time when you had the meal </h5>

                            <div class="mt-1 input-group">
                                <input id="hourInput"
                                    @input="updateTime(), isHourValid = ValidateText($event, timeValidation.hour.value, 'Hour', 'form-control form-control-md')"
                                    class="form-control form-control-md" type="number" min="0" max="23" name="hour"
                                    v-model="hour" placeholder="hour">
                                <div class="input-group-append">
                                    <span class="input-group-text"> hour </span>
                                </div>
                            </div>
                            <div :ref="timeValidation.hour" class="ml-2 invalid-feedback" style="display: none;">
                            </div>

                            <div class="mt-1 input-group">
                                <input id="minutesInput"
                                    @input="isMinutesValid = ValidateText($event, timeValidation.minutes.value, 'Minutes', 'form-control form-control-md')"
                                    class="form-control form-control-md" type="number" min="0" max="59" name="minutes"
                                    v-model="minutes" placeholder="minutes">
                                <div class="input-group-append">
                                    <span class="input-group-text"> minutes </span>
                                </div>
                            </div>
                            <div :ref="timeValidation.minutes" class="ml-2 invalid-feedback" style="display: none;">
                            </div>

                            <div class="mt-1">
                                <select class="form-control form-control-md" name="meal_time" @change="modifyTime()"
                                    v-model="selectedMealTime">
                                    <option disabled selected> Choose meal period </option>
                                    <option value="Breakfast"> Breakfast </option>
                                    <option value="Lunch"> Lunch </option>
                                    <option value="Dinner"> Dinner </option>
                                    <option value="Supper"> Supper </option>
                                    <option value="Night"> Night </option>
                                </select>
                            </div>
                        </form>

                        <div class="mt-3 p-2">
                            <h5> Click the meal you'd like to add to the date: </h5>
                            <div class="wrap">
                                <div v-for="meal in meals" :key="meal.meal_id">
                                    <button @click="addMealToGivenDate(meal['meal_id'])"
                                        class="btn btn-secondary btn-md m-2">
                                        <h6>{{ meal['name'] }}</h6>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="ml-5" v-if="meals && meals.length == 0">
                        <h5> You don't have any personal meals </h5>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger btn-md float-end" data-bs-dismiss="modal">
                        Cancel <font-awesome-icon :icon="['fas', 'x']" />
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>