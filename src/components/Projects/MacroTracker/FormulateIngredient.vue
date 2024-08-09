<script setup lang="ts">
import { checkValidationArr } from '@/Logic/MacroTracker/checkLogic/checkValidationArr';
import { fetchResource, getFormDataInJSONFormat } from '@/Logic/MacroTracker/Ajax/ajax';
import { hideModal } from '@/Logic/MacroTracker/hideModal';
import { getIngredients } from '@/Logic/MacroTracker/Ajax/get/getIngredients';
import type { Ingredient } from '@/Logic/MacroTracker/types';
import { ref, watch } from 'vue';
import AlertBox from './AlertBox.vue';
import { _alert, alertDanger } from '@/Logic/MacroTracker/alertFunctions';
import IngredientInputModule from './IngredientInputModule.vue';
import { createOrEdit_ingredient_validation_arr } from '@/Logic/MacroTracker/initVariables';

const props = defineProps<({
    formulate_type: string
    ingredient?: Ingredient
})>()

const http_method = ref<string>('POST')
const url = ref<string>('/ingredient')
const modal_id = `${props.formulate_type}_ingredient_modal`

const _formulate_type = ref<string>('Create')

watch(() => props.ingredient, (newIngredient) => {
    if (newIngredient) {

        _formulate_type.value = 'Edit'
        http_method.value = 'PUT'
        url.value = `/ingredient/${newIngredient.ingredient_id}`

    }
})

async function IngredientEvent() {

    console.log(createOrEdit_ingredient_validation_arr)
    if (checkValidationArr(createOrEdit_ingredient_validation_arr)) {
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
    <div class="modal modal-sm fade Modal" :id="modal_id">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title mr-2"> {{ _formulate_type }} Ingredient: </h3>
                </div>

                <div class="modal-body">

                    <AlertBox />

                    <form :id="`${props.formulate_type}_ingredient_form`">

                        <IngredientInputModule :ingredient="ingredient" food_type="ingredient" />

                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger btn-md ml-1" @click="hideModal(modal_id)"> Cancel </button>
                    <button type="submit" @click="IngredientEvent()" class="btn btn-success btn-md ml-1">
                        {{ _formulate_type }}
                        Ingredient
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>