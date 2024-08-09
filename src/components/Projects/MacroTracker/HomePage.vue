<script setup lang="ts">
import AverageMacros from './AverageMacros.vue'
import MealCalender from './MealCalender.vue';
import { construct_dates_for_days_in_week } from '@/Logic/MacroTracker/dateSystem';
import { onMounted } from 'vue';
import AlertBox from './AlertBox.vue';

const date = new Date() // Init data
const dayOfWeek = date.getDay() == 0 ? 6 : date.getDay() - 1 // Day of week, minus one because index in js start with 0
const dayOfMonth = date.getDate() // Date of month
let month = date.getMonth() + 1 // Which month in number format
let year = date.getUTCFullYear()

onMounted(() => {
    construct_dates_for_days_in_week(dayOfWeek, dayOfMonth, month, year)
})
</script>

<template>
    <AlertBox />

    <AverageMacros />

    <MealCalender />
</template>
