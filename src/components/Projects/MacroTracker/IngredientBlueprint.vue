<script setup lang="ts">
import type { IngredientInfo } from '@/Logic/MacroTracker/types';
import { ValidateText } from '@/Logic/MacroTracker/validation';
import { onMounted, ref, watch } from 'vue';
import { createOrEdit_ingredient_validation_arr, meal_validation } from '@/Logic/MacroTracker/initVariables';

const ingredient_validation = ref<HTMLElement | null>(null)
const input_element = ref<HTMLElement | null>(null)

onMounted(() => {
    input_element.value?.focus()
    ingredient_validation.value?.focus()
})

const props = defineProps<({
    ingredientInfo: IngredientInfo
    food_type: string
})>()

watch(props.ingredientInfo, () => {
    if (ingredient_validation.value) {
        ingredient_validation.value.style.display = 'none'
    }

    if (input_element.value) {
        input_element.value.classList.remove('is-invalid')
        input_element.value.classList.remove('is-valid')
    }
})

const inputClass = 'form-control form-control-md'

const validation_array = props.food_type == 'ingredient' ? createOrEdit_ingredient_validation_arr : meal_validation

</script>

<template>


    <label class="m-0 mt-1 form-label" :for="ingredientInfo.identifier.toLowerCase()"> {{
        ingredientInfo.identifier }}:
    </label>
    <div class="mt-2" :class="ingredientInfo.class">
        <input ref="input_element"
            @input="validation_array[`is${ingredientInfo.identifier}Valid`] = ValidateText($event, ingredient_validation, ingredientInfo.validation_type, inputClass)"
            :class="inputClass" :name="ingredientInfo.identifier.toLowerCase()" :type="ingredientInfo.inputType"
            step="any" :value="ingredientInfo.value">
        <div v-if="ingredientInfo.unit" class="input-group-append">
            <span class="input-group-text"> {{ ingredientInfo.unit }} </span>
        </div>
    </div>

    <div ref="ingredient_validation" class="ml-2 invalid-feedback"></div>


</template>