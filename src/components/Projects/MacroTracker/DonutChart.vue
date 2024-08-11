<script setup lang="ts">

import { reactive } from 'vue';

const props = defineProps<({
    series: number[]
    labels: string[]
})>()

const macros = reactive({
    series: props.series,
    options: {
        labels: props.labels,
        chart: {
            type: 'donut'
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: 'clamp(0.8rem, 1vw, 1.5rem)',
                            color: undefined,  // Change this to the desired text color
                        },
                        value: {
                            show: true,
                            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                            color: 'white',  // Change this to the desired text color
                        },
                        total: {
                            show: false,
                            label: 'Total',
                            color: '#FFFFFF',  // Change this to the desired text color
                            fontSize: '18px',
                        },
                    }
                }
            }
        },
        legend: {
            show: true,
            position: 'bottom',
            labels: {
                fontSize: '1px',
                colors: 'white'
            }
        },
    }
})

</script>

<template>

    <apexchart :options="macros.options" :series="macros.series"></apexchart>

</template>
