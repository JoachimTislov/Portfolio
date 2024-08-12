<script setup lang="ts">

import { onMounted } from 'vue';
import DonutChart from './DonutChart.vue';
import { getUserInfo } from '@/Logic/MacroTracker/Ajax/get/getUserInfo';
import { calcNutrientStatsForTheWeek, setupNutrientProgressChartsData } from '@/Logic/MacroTracker/statisticsFunctions';
import { get_calender_data } from '@/Logic/MacroTracker/Ajax/get/get_calender_data';
import { eaten_nutrient_progression, stats, labels, StatsToShow } from '@/Logic/MacroTracker/initVariables';
import { construct_dates_for_days_in_week } from '@/Logic/MacroTracker/dateSystem';
import RadialBar from './RadialBar.vue';
import StartEndInput from './StartEndInput.vue';

onMounted(async () => {
    await getUserInfo()
    await get_calender_data()

    construct_dates_for_days_in_week()

    calcNutrientStatsForTheWeek()
    setupNutrientProgressChartsData()
})

const calorieChartOptions = {
    chart: {
        foreColor: '#fff',
    },
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: '70%',
                background: "#212121"
            },
            dataLabels: {
                showOn: 'always',
                name: {
                    offsetY: -10,
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                },
                value: {
                    offsetX: -3,
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    padding: '20px'
                }
            }
        }
    },
    stroke: {
        linecap: 'round'
    },
    labels: ['Calories'],
}

</script>

<template>
    <section class="card mb-2">
        <header class="card-header p-3">
            <h3> Todays nutrient progression </h3>
        </header>
        <section class="card-body d-flex flex-wrap justify-content-center">

            <div class="d-flex align-items-center">
                <apexchart style="width: clamp(300px, 45vw, 450px);" type="radialBar"
                    :series="eaten_nutrient_progression['calories']" :options="calorieChartOptions">
                </apexchart>
            </div>

            <div class="d-flex flex-column">

                <div class="d-flex flex-wrap" v-for="(entry, index) in [['protein', 'fat'], ['carbohydrates', 'sugar']]"
                    :key="index">

                    <div v-for="nutrient in entry" :key="nutrient">

                        <RadialBar style="width: clamp(200px, 30vw, 300px);"
                            :series="eaten_nutrient_progression[nutrient]"
                            :label="nutrient.charAt(0).toLocaleUpperCase() + nutrient.slice(1)" />

                    </div>
                </div>
            </div>

        </section>
        <header class="card-header p-3 d-flex">
            <div class="d-flex flex-column">
                <h2 class="m-2"> Statistics - Total, average and more... </h2>
                <div class="d-flex flex-column m-3" style="width: 200px;">
                    <StartEndInput />
                </div>
            </div>
        </header>
        <section class="card-body d-flex flex-wrap">



            <template v-if="StatsToShow">

                <div class="p-3 m-1 donutContainer">
                    <h4> Overall </h4>

                    <DonutChart :labels="labels" :series="stats.total_macros" />
                </div>


                <div class="p-3 m-1 donutContainer">
                    <h4> Average </h4>
                    <DonutChart :labels="labels" :series="stats.average_macros" />
                </div>
            </template>

            <template v-else>
                <h4> Zero data to visualize, add meals to your calender inside of given period </h4>
            </template>

        </section>
    </section>
</template>


<style scoped>
.donutContainer {
    width: clamp(300px, 40vw, 500px);
}

.nutrient-container {
    flex: 1;
    min-width: clamp(200px, 10vw, 500px);
}
</style>