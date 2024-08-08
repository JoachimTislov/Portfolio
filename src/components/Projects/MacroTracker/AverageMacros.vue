<script setup lang="ts">

import { days_of_the_week_with_date } from '@/Data/MacroTracker';
import { get_average_macros } from '@/Logic/MacroTracker/Ajax/get/getAverageMacros';
import { average_macros_this_week } from '@/Logic/MacroTracker/initVariables'
import { onMounted } from 'vue';

onMounted(async () => {
    if (!average_macros_this_week.value) await get_average_macros()
})

</script>

<template>
    <section class="card mb-2">
        <header class="card-header">
            <h4> Average macros per day: </h4>
        </header>
        <article class="card-body ml-3">
            <h5> <strong> This week; {{ days_of_the_week_with_date[0].Date }} - {{ days_of_the_week_with_date[6].Date }}
                </strong> </h5>
            <div class="row">
                <h5 style="width: 200px;" class="border border-info border-1 p-2"
                    v-for="(value, name) in average_macros_this_week" :key="name">
                    <strong>
                        <template v-if="name == 'calories'">{{ name }}: {{ value }} kcal </template>
                        <template v-if="name != 'calories'">{{ name }}: {{ value }} g </template>
                    </strong>
                </h5>
            </div>
        </article>
    </section>
</template>