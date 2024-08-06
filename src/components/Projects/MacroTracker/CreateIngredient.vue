<script setup lang="ts">
import { ValidateText } from '@/Logic/MacroTracker/validation';

import {
    create_ingredient_alert,
    validation_messages
} from '@/Logic/MacroTracker/initVariables';

import { setElementReference } from '@/Logic/MacroTracker/setElementReference'

import { checkValidationArr } from '@/Logic/MacroTracker/checkLogic/checkValidationArr';
import { fetchResource, getFormDataInJSONFormat } from '@/Logic/MacroTracker/Ajax/ajax';
import { routeToPage } from '@/Logic/MacroTracker/routeToPage';

const validation_arr: { [key: string]: boolean } = {
    isIngredientNameValid: false,
    isAmountValid: false,
    isProteinValid: true,
    isCaloriesValid: true,
    isCarbohydratesValid: true,
    isFatValid: true,
    isSugarValid: true,
}


const _arr: {
    identifier: string
    validation_type: string
    inputType: string
    value: string | number
    class: string
    unit?: string
}[] = [
        { class: 'form-group', identifier: 'Name', validation_type: 'Name', inputType: 'text', value: '' },
        { class: 'form-group', identifier: 'Amount', validation_type: 'Amount', inputType: 'text', value: '0' },
        { class: 'input-group', identifier: 'Calories', validation_type: 'Nutrient', inputType: 'number', value: 0, unit: 'kcal' },
        { class: 'input-group', identifier: 'Carbohydrates', validation_type: 'Nutrient', inputType: 'number', value: 0, unit: 'g' },
        { class: 'input-group', identifier: 'Fat', validation_type: 'Nutrient', inputType: 'number', value: 0, unit: 'g' },
        { class: 'input-group', identifier: 'Protein', validation_type: 'Nutrient', inputType: 'number', value: 0, unit: 'g' },
        { class: 'input-group', identifier: 'Sugar', validation_type: 'Nutrient', inputType: 'number', value: 0, unit: 'g' },
    ]

function resetEditForm() {
    _arr.forEach(entry => {
        const input = document.getElementById(`create_ingredient_${entry.identifier}_input`) as HTMLInputElement | null
        const div = validation_messages.create_ingredient[entry.identifier].value
        if (div) div.style.display = "none";
        if (input) {
            input.className = "form-control form-control-md"

            if (entry.identifier == "amount" || entry.identifier == "name") {
                input.value = ''
            } else {
                input.value = '0'
            }
        }
    })
}

async function eventCreateIngredient() {
    if (checkValidationArr(validation_arr)) {
        const json = getFormDataInJSONFormat('create_ingredient_form')
        const response = await fetchResource('POST', json, '/ingredient', create_ingredient_alert.value, 'token')

        if (response && response.ok) {

            console.log('Successfully created ingredient')

            routeToPage('macroCreateIngredients')

            resetEditForm()
        }
    }
}
</script>

<template>
    <div class="modal fade Modal" id="create_ingredient_modal">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title mr-2"> Create Ingredient: </h3>
                </div>

                <div class="modal-body">
                    <div id="create_ingredient_alert" class="m-1 alert alert-dismissible alert-danger"
                        style="display: none;"></div>
                    <form id="create_ingredient_form">

                        <template v-for="entry in _arr" :key="entry.identifier">
                            <label class="m-0 mt-1 form-label" :for="entry.identifier.toLowerCase()"> {{
                                entry.identifier }}:
                            </label>
                            <div class="mt-2" :class="entry.class">
                                <input :id="`create_ingredient_${entry.identifier.toLowerCase()}_input`"
                                    @input="validation_arr[`is${entry.identifier}Valid`] = ValidateText($event, validation_messages.create_ingredient[entry.identifier.toLocaleLowerCase()].value, entry.validation_type, 'form-control form-control-md')"
                                    class="form-control form-control-md" :name="entry.identifier.toLowerCase()"
                                    :type="entry.inputType" step="any" :value="entry.value">
                                <div v-if="entry.unit" class="input-group-append">
                                    <span class="input-group-text"> {{ entry.unit }} </span>
                                </div>
                            </div>

                            <div :ref="el => setElementReference(el, validation_messages.create_ingredient[entry.identifier.toLocaleLowerCase()])"
                                class="ml-2 invalid-feedback"></div>
                        </template>

                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger btn-lg ml-1" data-bs-dismiss="modal" @click="resetEditForm()"> Cancel
                    </button>
                    <button type="button" data-bs-dismiss="modal" @click="eventCreateIngredient()"
                        class="btn btn-success btn-lg ml-1">
                        Create
                        Ingredient </button>
                </div>
            </div>
        </div>
    </div>
</template>