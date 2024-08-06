<script setup lang="ts">
import { ValidateText } from '@/Logic/MacroTracker/validation';

import {
    create_ingredient_amount_validation_message,
    create_ingredient_calories_validation_message,
    create_ingredient_carbohydrates_validation_message,
    create_ingredient_fat_validation_message,
    create_ingredient_name_validation_message,
    create_ingredient_protein_validation_message,
    create_ingredient_sugar_validation_message,
    create_ingredient_alert

} from '@/Logic/MacroTracker/initVariables';

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
    identifier: string,
    div: HTMLElement | null
}[] = [
        { identifier: 'Amount', div: create_ingredient_amount_validation_message.value },
        { identifier: 'Calories', div: create_ingredient_calories_validation_message.value },
        { identifier: 'Carbohydrates', div: create_ingredient_carbohydrates_validation_message.value },
        { identifier: 'Fat', div: create_ingredient_fat_validation_message.value },
        { identifier: 'Name', div: create_ingredient_name_validation_message.value },
        { identifier: 'Protein', div: create_ingredient_protein_validation_message.value },
        { identifier: 'Sugar', div: create_ingredient_sugar_validation_message.value },
    ]

function resetEditForm() {
    _arr.forEach(entry => {
        const input = document.getElementById(`create_ingredient_${entry.identifier}_input`) as HTMLInputElement | null
        if (entry.div) entry.div.style.display = "none";
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
    <div class="modal fade" id="create_ingredient_modal">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title mr-2"> Create Ingredient: </h3>
                </div>

                <div class="modal-body">
                    <div id="create_ingredient_alert" class="m-1 alert alert-dismissible alert-danger"
                        style="display: none;"></div>
                    <form id="create_ingredient_form">

                        <div class="form-group mt-2" v-for="entry in _arr" :key="entry.identifier">
                            <label class="form-label" :for="entry.identifier.toLowerCase()"> {{ entry.identifier }}:
                            </label>
                            <input :id="`create_ingredient_${entry.identifier.toLowerCase()}_input`"
                                @input="validation_arr[`is${entry.identifier}Valid`] = ValidateText($event, entry.div, entry.identifier, 'form-control form-control-md')"
                                class="form-control form-control-md" :name="entry.identifier.toLowerCase()"
                                type="number" step="any" value="0">
                            <div :ref="`create_ingredient_${entry.identifier}_validation_message`"
                                class="ml-2 invalid-feedback"></div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger btn-lg ml-1" data-bs-dismiss="modal" @click="resetEditForm()"> Cancel
                    </button>
                    <button type="button" data-bs-dismiss="modal" @click="eventCreateIngredient()"
                        class="btn btn-success btn-lg ml-1"> Create
                        Ingredient </button>
                </div>
            </div>
        </div>
    </div>
</template>