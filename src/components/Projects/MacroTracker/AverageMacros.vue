<script setup lang="ts">

import { onMounted } from 'vue';
import DonutChart from './DonutChart.vue';
import { getUserInfo } from '@/Logic/MacroTracker/Ajax/get/getUserInfo';
import { calcNutrientStatsForTheWeek, setupNutrientProgressChartsData } from '@/Logic/MacroTracker/statisticsFunctions';
import { get_calender_data } from '@/Logic/MacroTracker/Ajax/get/get_calender_data';
import { eaten_nutrient_progression, stats, labels, days_of_the_week_with_date, StatsToShow } from '@/Logic/MacroTracker/initVariables';
import { construct_dates_for_days_in_week } from '@/Logic/MacroTracker/dateSystem';

onMounted(async () => {
    await getUserInfo()
    const calender_data_response = await get_calender_data()

    construct_dates_for_days_in_week()

    calcNutrientStatsForTheWeek(calender_data_response)
    setupNutrientProgressChartsData(calender_data_response)
})

const calorieChartOptions = {
    chart: {
        foreColor: '#fff',
    },
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 15,
                size: '70%',
            },
            dataLabels: {
                showOn: 'always',
                name: {
                    offsetY: -10,
                    fontSize: 'clamp(1rem, 2vw, 2rem)',
                },
                value: {
                    offsetX: -3,
                    fontSize: 'clamp(1rem, 2vw, 2rem)',
                    padding: '20px'
                }
            }
        }
    },
    stroke: {
        linecap: 'round'
    },
    labels: ['Progress'],
}

const progressChartOptions = {
    chart: {
        foreColor: '#fff',
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: '70%',
                background: "#293450"
            },
            dataLabels: {
                showOn: 'always',
                name: {
                    offsetY: -10,
                    fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
                },
                value: {
                    offsetY: 2,
                    fontSize: 'clamp(1rem, 1vw, 2rem)',
                    padding: '20px'
                }
            }
        },
        track: {
            dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 4,
                opacity: 0.15
            }
        },
    },
    labels: ['Progress'],
}

</script>

<template>
    <section class="card mb-2">
        <header class="card-header p-3">
            <h3> Todays nutrient Progression </h3>
        </header>
        <section class="card-body d-flex flex-wrap justify-content-center">

            <div style="width: clamp(400px, 20vw, 600px)">
                <h4> Calorie consumption: </h4>
                <apexchart type="radialBar" :series="eaten_nutrient_progression['calories']"
                    :options="calorieChartOptions">
                </apexchart>
            </div>

            <div class="d-flex flex-column">

                <div class="d-flex flex-wrap" v-for="(entry, index) in [['protein', 'fat'], ['carbohydrates', 'sugar']]"
                    :key="index">

                    <div class="nutrient-container" v-for="nutrient in entry" :key="nutrient" style="width: 100%;">

                        <h5> {{ nutrient.charAt(0).toLocaleUpperCase() + nutrient.slice(1) }}</h5>

                        <apexchart type="radialBar" :series="eaten_nutrient_progression[nutrient]"
                            :options="progressChartOptions">
                        </apexchart>

                    </div>
                </div>
            </div>

        </section>
        <header class="card-header p-3">
            <h3> Statistics from this week: {{ days_of_the_week_with_date[0].Date }} - {{
                days_of_the_week_with_date[6].Date }}
            </h3>
        </header>
        <section class="card-body d-flex flex-wrap justify-content-center">

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
                <h4> Zero data to visualize, please add meals to your calender inside of given period </h4>
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
    min-width: 150px;
}
</style>