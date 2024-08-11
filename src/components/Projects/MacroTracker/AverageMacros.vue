<script setup lang="ts">

import { days_of_the_week_with_date } from '@/Data/MacroTracker';
import { getData } from '@/Logic/MacroTracker/Ajax/ajax';
import type { Calender_data } from '@/Logic/MacroTracker/types';
import { onMounted, reactive, ref } from 'vue';
import DonutChart from './DonutChart.vue';
import { getUserInfo } from '@/Logic/MacroTracker/Ajax/get/getUserInfo';
import { recommended_nutrient_data, calender_data } from '@/Logic/MacroTracker/initVariables';
import { getTodaysDate } from '@/Logic/MacroTracker/dateSystem';
import { structureCalenderData } from '@/Logic/MacroTracker/structure_calender_data';

onMounted(async () => {
    await getUserInfo()
    await get_calender_data()
})


const calories_progression = reactive([0])

const labels = ['Protein', 'Carbohydrates', 'Fat', 'Sugar']
const stats = reactive({
    total_macros: [0, 0, 0, 0],
    average_macros: [0, 0, 0, 0]
})

async function get_calender_data() {
    console.log('Getting data', recommended_nutrient_data)

    const user_id = localStorage.getItem('user_id')
    const url = `/calender_data/${user_id}`
    const response = await getData(url)

    const calender_data_response: Calender_data = await response?.json()

    if (calender_data_response) {
        // Adding all of the nutrients for the given week
        days_of_the_week_with_date.value.forEach((entry) => {
            const date = entry['Date']

            if (calender_data_response[date] && calender_data_response[date].length > 0) {

                for (const entry of calender_data_response[date]) {
                    for (let i = 0; i < labels.length; i++) {
                        stats['total_macros'][i] += entry.meal[labels[i].toLocaleLowerCase()] as number
                    }
                }
            }
        })
    }

    for (let i = 0; i < labels.length; i++) {
        stats.average_macros[i] = Math.round(stats.total_macros[i] / 7)
    }


    let eaten_calories = 0;
    const dateOfToday = getTodaysDate()
    if (calender_data_response[dateOfToday]) {

        for (const entry of calender_data_response[dateOfToday]) {
            eaten_calories += entry.meal.calories
        }
    }

    calories_progression[0] = Math.round((eaten_calories / recommended_nutrient_data[0]) * 100)

    calender_data.value = calender_data_response

    structureCalenderData()
}

</script>

<template>
    <section class="card mb-2">
        <header class="card-header p-3">
            <h3> Statistics; {{ days_of_the_week_with_date[0].Date }} - {{ days_of_the_week_with_date[6].Date }} </h3>
        </header>
        <section class="card-body d-flex flex-wrap justify-content-center">

            <div style=" width: clamp(300px, 40vw, 500px);">
                <h4> Todays calorie intake </h4>
                <apexchart type="radialBar" :series="calories_progression"
                    :options="{ labels: ['Progress'], chart: { foreColor: '#fff' } }">
                </apexchart>
            </div>

            <div>
                <div class="border border-2 rounded p-3 m-1 donutContainer">
                    <h4> Overall </h4>

                    <DonutChart :labels="labels" :series="stats.total_macros" />
                </div>


                <div class="border border-2 rounded p-3 m-1 donutContainer">
                    <h4> Average </h4>
                    <DonutChart :labels="labels" :series="stats.average_macros" />
                </div>
            </div>

        </section>
    </section>
</template>


<style scoped>
.donutContainer {
    width: clamp(300px, 40vw, 500px)
}
</style>