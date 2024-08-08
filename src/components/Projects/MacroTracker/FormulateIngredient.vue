<script setup lang="ts">
import { ValidateText } from '@/Logic/MacroTracker/validation';
import { setElementReference } from '@/Logic/MacroTracker/setElementReference'
import { checkValidationArr } from '@/Logic/MacroTracker/checkLogic/checkValidationArr';
import { fetchResource, getFormDataInJSONFormat } from '@/Logic/MacroTracker/Ajax/ajax';
import { hideModal } from '@/Logic/MacroTracker/hideModal';
import { getIngredients } from '@/Logic/MacroTracker/Ajax/get/getIngredients';
import type { Form_configuration, Ingredient, Validation_array, ValidationRefs } from '@/Logic/MacroTracker/types';
import { onMounted, reactive, ref, watch } from 'vue';

import AlertBox from './AlertBox.vue';
import { _alert, alertDanger } from '@/Logic/MacroTracker/alertFunctions';

const validation: ValidationRefs = {
    name: ref<HTMLElement | null>(null),
    amount: ref<HTMLElement | null>(null),
    protein: ref<HTMLElement | null>(null),
    calories: ref<HTMLElement | null>(null),
    carbohydrates: ref<HTMLElement | null>(null),
    fat: ref<HTMLElement | null>(null),
    sugar: ref<HTMLElement | null>(null)
}

onMounted(() => {
    for (const key of Object.keys(validation)) {
        validation[key].value?.focus()
    }
})

const props = defineProps<({
    formulate_type: string
    ingredient?: Ingredient
})>()

const http_method = ref<string>('POST')
const url = ref<string>('/ingredient')
const modal_id = `${props.formulate_type}_ingredient_modal`

const _formulate_type = ref<string>('Create')

const form_configurations: Form_configuration = reactive([
    { class: 'form-group', identifier: 'Name', validation_type: 'Name', inputType: 'text', value: '' },
    { class: 'form-group', identifier: 'Amount', validation_type: 'Amount', inputType: 'text', value: 0 },
    { class: 'input-group', identifier: 'Calories', validation_type: 'Nutrient', inputType: 'number', value: 0, unit: 'kcal' },
    { class: 'input-group', identifier: 'Carbohydrates', validation_type: 'Nutrient', inputType: 'number', value: 0, unit: 'g' },
    { class: 'input-group', identifier: 'Fat', validation_type: 'Nutrient', inputType: 'number', value: 0, unit: 'g' },
    { class: 'input-group', identifier: 'Protein', validation_type: 'Nutrient', inputType: 'number', value: 0, unit: 'g' },
    { class: 'input-group', identifier: 'Sugar', validation_type: 'Nutrient', inputType: 'number', value: 0, unit: 'g' },
])

const isEdit = props.formulate_type == 'edit'
const bool = isEdit ? true : false

const validation_arr: Validation_array = {
    isNameValid: bool,
    isAmountValid: bool,
    isProteinValid: true,
    isCaloriesValid: true,
    isCarbohydratesValid: true,
    isFatValid: true,
    isSugarValid: true,
}

watch(() => props.ingredient, (newIngredient) => {
    if (newIngredient) {

        _formulate_type.value = 'Edit'
        http_method.value = 'PUT'
        url.value = `/ingredient/${props.ingredient?.ingredient_id}`

        for (const configuration of form_configurations) {
            const key = configuration.identifier.toLocaleLowerCase()
            configuration.value = newIngredient[key]
        }
    }
})

async function IngredientEvent() {
    if (checkValidationArr(validation_arr)) {
        const json = getFormDataInJSONFormat(`${props.formulate_type}_ingredient_form`)
        const response = await fetchResource(http_method.value, json, url.value, 'token')

        if (response && response.ok) {
            // update list of ingredients
            await getIngredients()

            hideModal(modal_id)
        }
    } else {
        alertDanger()
        _alert("Fill out the required fields: 'Name' and 'Amount'. Nutrient values may be zero.")
    }
}

</script>

<template>
    <div class="modal fade Modal" :id="modal_id">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title mr-2"> {{ _formulate_type }} Ingredient: </h3>
                </div>

                <div class="modal-body">

                    <AlertBox />

                    <form :id="`${props.formulate_type}_ingredient_form`">

                        <template v-for="entry in form_configurations" :key="entry.identifier">
                            <label class="m-0 mt-1 form-label" :for="entry.identifier.toLowerCase()"> {{
                                entry.identifier }}:
                            </label>
                            <div class="mt-2" :class="entry.class">
                                <input :id="`${props.formulate_type}_ingredient_${entry.identifier}_input`"
                                    @input="validation_arr[`is${entry.identifier}Valid`] = ValidateText($event, validation[entry.identifier.toLocaleLowerCase()].value, entry.validation_type, 'form-control form-control-md')"
                                    class="form-control form-control-md" :name="entry.identifier.toLowerCase()"
                                    :type="entry.inputType" step="any" :value="entry.value">
                                <div v-if="entry.unit" class="input-group-append">
                                    <span class="input-group-text"> {{ entry.unit }} </span>
                                </div>
                            </div>

                            <div :ref="el => setElementReference(el, validation[entry.identifier.toLocaleLowerCase()])"
                                class="ml-2 invalid-feedback"></div>
                        </template>

                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger btn-lg ml-1" @click="hideModal(modal_id)"> Cancel </button>
                    <button type="button" @click="IngredientEvent()" class="btn btn-success btn-lg ml-1"> {{
                        _formulate_type }}
                        Ingredient
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>