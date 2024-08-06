<script setup lang="ts">
import MealsPage from '../../components/Projects/MacroTracker/MealsPage.vue' 
</script>

<template>
    <Suspense>
        <template #default>
            <MealsPage />
        </template>
        <template #fallback>
            <div>Loading meals...</div>
        </template>
    </Suspense>
</template>