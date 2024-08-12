<script setup lang="ts">

import { eaten_nutrient_progression } from '@/Logic/MacroTracker/initVariables';

import RadialBar from './RadialBar.vue';

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

            <div class="d-flex flex-wrap justify-content-center"
                v-for="(entry, index) in [['protein', 'fat'], ['carbohydrates', 'sugar']]" :key="index">

                <div v-for="nutrient in entry" :key="nutrient">

                    <RadialBar style="width: clamp(200px, 30vw, 300px);" :series="eaten_nutrient_progression[nutrient]"
                        :label="nutrient.charAt(0).toLocaleUpperCase() + nutrient.slice(1)" />

                </div>
            </div>
        </div>

    </section>

</template>