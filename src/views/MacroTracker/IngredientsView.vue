<script setup lang="ts">
import IngredientsPage from '../../components/Projects/MacroTracker/IngredientsPage.vue' 
</script>

<template>
    <Suspense>
        <template #default>
            <IngredientsPage />
        </template>
        <template #fallback>
            <div>Loading ingredients...</div>
        </template>
    </Suspense>
</template>