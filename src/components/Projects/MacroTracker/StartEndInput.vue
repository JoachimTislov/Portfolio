<script setup lang="ts">

import { selected_end_date, selected_start_date } from '@/Logic/MacroTracker/initVariables';
import { structureCalenderData } from '@/Logic/MacroTracker/structure_calender_data';

</script>


<template>


    <div class="d-flex align-items-center">
        <label for="start" class="me-2"> Start: </label>
        <input name="start" type="date" class="form-control form-control-md" v-model="selected_start_date"
            @change="structureCalenderData('start')">
    </div>
    <div class="d-flex align-items-center mt-1">
        <label for="end" class="me-3"> End: </label>
        <input name="end" type="date" class="form-control form-control-md" v-model="selected_end_date"
            @change="structureCalenderData('end')">
    </div>


</template>