<script setup lang="ts">

defineProps<({
    message: string
})>()

</script>


<template>

    <div class="alert alert-dismissible alert-warning">

        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>

        <h4 class="alert-heading">Be aware!</h4>
        <h6 class="lead"> {{ message }} </h6>

    </div>

</template>

<style scoped>
h6 {
    font-weight: bold;
    font-size: 1.1rem;
}
</style>