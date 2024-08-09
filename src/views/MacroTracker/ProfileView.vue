<script setup lang="ts">
import ProfilePage from '../../components/Projects/MacroTracker/ProfilePage.vue' 
</script>

<template>
    <Suspense>
        <template #default>
            <ProfilePage />
        </template>
        <template #fallback>
            <div>Loading user profile...</div>
        </template>
    </Suspense>
</template>