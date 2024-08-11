<script setup lang="ts">

import { meals_for_time_of_day, selectedDate, days_of_the_week_with_date } from '@/Logic/MacroTracker/initVariables';
import { onMounted } from 'vue';
import { construct_dates_for_days_in_week, update_calender_info } from '@/Logic/MacroTracker/dateSystem';
import SelectMeal from './selectMeal.vue';
import { hideAlert } from '@/Logic/MacroTracker/alertFunctions';
import { deleteEntity } from '@/Logic/MacroTracker/Ajax/ajax';
import { get_calender_data } from '@/Logic/MacroTracker/Ajax/get/get_calender_data';

onMounted(async () => {
    construct_dates_for_days_in_week()

    await get_calender_data()
})
</script>

<template>

    <SelectMeal />

    <section class="card" id="meals_for_given_date">
        <div class="card-header d-flex flex-wrap">
            <div class="d-flex gap-1">
                <div class="d-flex flex-column">
                    <h2 class="mt-1"> Meal Calender </h2>
                    <div>
                        <input type="date" class="form-control form-control-md" v-model="selectedDate"
                            @change="update_calender_info($event)">
                    </div>
                </div>
            </div>
            <div class="m-2 ms-auto">
                <button class="btn-success btn btn-md" data-bs-toggle="modal" data-bs-target="#select_meal_modal"
                    @click="hideAlert()">
                    Add a meal
                </button>
            </div>
        </div>

        <div class="card-body">
            <template v-for="(entry, index) in days_of_the_week_with_date" :key="index">
                <div class="card-header">
                    <h5 class="mt-2"> {{ entry.Day }} {{ entry.Date }} </h5>
                </div>
                <div class="d-flex flex-wrap gap-3 mt-1">
                    <template v-for="(meals_for_given_time, meal_time) in meals_for_time_of_day[entry.Date]"
                        :key="meal_time">
                        <div class="list-group-item list-group-item-secondary p-1 rounded border border-1">
                            <h4> {{ meal_time }} </h4>
                        </div>
                        <div class="d-flex flex-column">
                            <div v-for="(item, index) in meals_for_given_time" :key="index"
                                :id="`calender_meal_${item['calender_id']}`">
                                <div class="d-flex mt-2 gap-2">
                                    <h5 class="border border-1 p-3 rounded"> {{ item.meal['Name'] }}, {{
                                        item['time_of_day'] }}

                                        <button class="float-right btn-danger btn btn-sm"
                                            @click="deleteEntity('/calender/' + item['calender_id'])">
                                            Delete <font-awesome-icon :icon="['fas', 'trash']" />
                                        </button>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <!--<div class="m-3" v-if="zero_meals_to_show">
                    <h4> There are zero meals for this date </h4>
                </div>-->

            </template>
        </div>
    </section>

</template>