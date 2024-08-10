<script setup lang="ts">

import { days_of_the_week_with_date } from '@/Data/MacroTracker';
import { getData } from '@/Logic/MacroTracker/Ajax/ajax';
import type { Average_macros_data, Average_macros_data_entry } from '@/Logic/MacroTracker/types';
import { onMounted, reactive } from 'vue';
import DonutChart from './DonutChart.vue';

onMounted(async () => {
    await get_average_macros()
})

const labels = ['Calories', 'Protein', 'Carbohydrates', 'Fat', 'Sugar']
const stats = reactive({
    total_macros: [0, 0, 0, 0, 0],
    average_macros: [0, 0, 0, 0, 0]
})

async function get_average_macros() {
    console.log('Getting data')

    const user_id = localStorage.getItem('user_id')
    const url = `/average_macros/${user_id}`
    const response = await getData(url)

    const average_macros_data: Average_macros_data = await response?.json()

    if (average_macros_data) {
        // Adding all of the nutrients for the given week
        days_of_the_week_with_date.value.forEach((entry) => {
            average_macros_data.forEach((line: Average_macros_data_entry) => {
                if (entry['Date'] == line['date']) {

                    for (let i = 0; i < labels.length; i++) {
                        stats['total_macros'][i] += line.meal[labels[i].toLocaleLowerCase()] as number
                    }
                }
            })
        })
    }

    for (let i = 0; i < labels.length; i++) {
        stats.average_macros[i] = Math.round(stats.total_macros[i] / 7)
    }
}


</script>

<template>
    <section class="card mb-2">
        <header class="card-header p-3">
            <h3> Statistics; {{ days_of_the_week_with_date[0].Date }} - {{ days_of_the_week_with_date[6].Date }} </h3>
        </header>
        <section class="card-body d-flex flex-wrap justify-content-center">


            <div class="donutContainer">
                <h4 class="ml-5"> Overall </h4>

                <DonutChart :labels="labels" :series="stats.total_macros" />
            </div>


            <div class="donutContainer">
                <h4 class="ml-5"> Average </h4>
                <DonutChart :labels="labels" :series="stats.average_macros" />
            </div>

        </section>
    </section>
</template>


<style scoped>
.donutContainer {
    width: clamp(300px, 40vw, 500px)
}
</style>