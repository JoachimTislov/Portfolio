<script setup lang="ts">

import { deleteEntity } from '@/Logic/MacroTracker/Ajax/ajax';
import { calender_date, meals_for_given_date, zero_meals_to_show, day_for_chosenDate, days_of_the_week_index } from '@/Logic/MacroTracker/initVariables';
import { get_meals_for_given_date } from '@/Logic/MacroTracker/Ajax/get/getMealsForGivenDate';
import { ref } from 'vue';
import { get_average_macros } from '@/Logic/MacroTracker/Ajax/get/getAverageMacros';
import { construct_dates_for_days_in_week } from '@/Logic/MacroTracker/dateSystem';
import { check_if_number_is_less_than_10 } from '@/Logic/MacroTracker/checkLogic/check_if_number_is_less_than_10';
import SelectMeal from './selectMeal.vue';
import { hideAlert } from '@/Logic/MacroTracker/alertFunctions';

// Have to edit it to format yyyy-mm-dd
const chosenDate = ref<string>(`${calender_date.value.split('-')[2]}-${calender_date.value.split('-')[1]}-${calender_date.value.split('-')[0]}`)

async function update_calender_info(event: Event) {
    const value = (event.target as HTMLInputElement).value
    chosenDate.value = value

    const dayOfMonth = parseInt(value.split('-')[2])
    const month = parseInt(value.split('-')[1])
    const year = parseInt(value.split('-')[0])

    // dd-mm-yyyy
    calender_date.value = `${check_if_number_is_less_than_10(dayOfMonth)}-${check_if_number_is_less_than_10(month)}-${year}`

    const dayOfWeek = (new Date(chosenDate.value)).getDay() == 0 ? 6 : (new Date(chosenDate.value)).getDay() - 1
    // Recalculate week and update average macros
    construct_dates_for_days_in_week(dayOfWeek, dayOfMonth, month, year)

    days_of_the_week_index.value = dayOfWeek

    await get_meals_for_given_date()
    await get_average_macros()
}

</script>

<template>

    <SelectMeal />

    <section class="card" id="meals_for_given_date">
        <div class="card-header">
            <div class="d-flex gap-2">
                <h4 class="mt-1"> Meal Calender - </h4>
                <div><input type="date" class="form-control form-control-md" v-model="chosenDate"
                        @change="update_calender_info($event)">
                </div>
            </div>
        </div>

        <div class="card-body">
            <div class="card-header">

                <div class="ml-1 d-flex gap-2">
                    <h5 class="mt-2"> {{ day_for_chosenDate }} {{ calender_date }} </h5>

                    <button class="ml-2 btn-success btn btn-sm" data-bs-toggle="modal"
                        data-bs-target="#select_meal_modal" @click="hideAlert">
                        Add Meal
                    </button>
                </div>

            </div>
            <div class="wrap gap-3 mt-1">
                <div v-for="(meals_for_given_time, meal_time) in meals_for_given_date" :key="meal_time"
                    v-show="meals_for_given_time.length > 0">
                    <div class="list-group-item list-group-item-info">
                        <h3> {{ meal_time }} </h3>
                    </div>
                    <div class="wrap">
                        <div v-for="meal in meals_for_given_time" :key="meal['calender_id']"
                            :id="`calender_meal_${meal['calender_id']}`">
                            <div class="d-flex gap-2">
                                <h5 class="border border-1 p-3 rounded"> {{ meal['meal_name'] }}, {{ meal['time_of_day']
                                    }}

                                    <button class="float-right btn-danger btn btn-sm"
                                        @click="deleteEntity('/calender/' + meal['calender_id'], get_meals_for_given_date)">
                                        Delete <font-awesome-icon :icon="['fas', 'trash']" />
                                    </button>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="zero_meals_to_show" class="ml-3">
                    <h5 class="mt-2"> You don't have any meals for the this date </h5>
                </div>
            </div>
        </div>
    </section>

</template>