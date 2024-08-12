<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import AlertBox from '../AlertBox.vue';
import { ValidateText } from '@/Logic/MacroTracker/validation';
import type { validation_Object, Ingredient, Ingredients, Meal_with_ingredients } from '@/Logic/MacroTracker/types';
import { hideModal } from '@/Logic/MacroTracker/hideModal';
import { _alert, alertDanger } from '@/Logic/MacroTracker/alertFunctions';
import { getMeals } from '@/Logic/MacroTracker/Ajax/get/getMeals';
import { fetchResource } from '@/Logic/MacroTracker/Ajax/ajax';
import { getFormDataInJSONFormat } from '@/Logic/MacroTracker/Ajax/get/getFormDataInJSONFormat';
import { checkValidationArr } from '@/Logic/MacroTracker/checkLogic/checkValidationArr';
import { meal_name_validation, meal_validation, ingredients, createOrEditIngredient, ingredient_validation } from '@/Logic/MacroTracker/initVariables';
import FormulateIngredient from './FormulateIngredient.vue';
import IngredientInputModule from './IngredientInputModule.vue';
import { getIngredients } from '@/Logic/MacroTracker/Ajax/get/getIngredients';
import { deleteEntity } from '@/Logic/MacroTracker/Ajax/ajax';

const meal_name_message_validation = ref<HTMLElement | null>(null)

onMounted(async () => {
    meal_name_message_validation.value?.focus()
    await getIngredients()
})

const props = defineProps<({
    formulate_type: string
    meal?: Meal_with_ingredients
})>()

const ingredientsData = ref<Ingredients>([])

const http_method = ref<string>('POST')
const url = ref<string>('/meal')
const modal_id = `${props.formulate_type}_meal_modal`

const _formulate_type = ref<string>('Create')

watch(() => props.meal, (newMeal) => {
    const ingredientValidation = ref<validation_Object>(ingredient_validation)

    if (newMeal) {
        _formulate_type.value = 'Edit'
        http_method.value = 'PUT'
        url.value = `/meal/${newMeal.meal_id}`

        ingredientValidation.value.name = true
        ingredientValidation.value.amount = true

        // Deep copy, preventing un wanted features
        const copy = JSON.parse(JSON.stringify(newMeal.ingredients))
        ingredientsData.value = copy
    }
    meal_validation.value = []

    for (let i = 0; i < ingredientsData.value.length; i++) {
        meal_validation.value.push(ingredientValidation.value)
    }
})


function check_meal_validation() {

    if (!meal_name_validation.value) return false

    for (const ingredient of meal_validation.value) {
        const result = checkValidationArr(ingredient)
        if (!result) return result
    }

    return true
}

function addIngredientToMeal(ingredient: Ingredient) {

    if (!checkIfIngredientIsAlreadyAdded(ingredient.ingredient_id)) {
        ingredientsData.value.push(ingredient)

        const validation = ingredient_validation
        validation.amount = true
        validation.name = true

        meal_validation.value.push(validation)
    } else {
        _alert('You can not add the same ingredient. Instead change the amount')
        alertDanger()
    }

}

function checkIfIngredientIsAlreadyAdded(id_to_compare: number) {

    for (const ingredient of ingredientsData.value) {
        if (ingredient.ingredient_id == id_to_compare) {
            return true;
        }
    }

    return false
}

function addEmptyIngredient() {
    ingredientsData.value.push({
        ingredient_id: 0,
        name: '',
        amount: 0,
        protein: 0,
        calories: 0,
        carbohydrates: 0,
        fat: 0,
        sugar: 0
    })
    meal_validation.value.push(ingredient_validation)
}

function removeEntry(index: number) {
    ingredientsData.value.splice(index, 1)
    meal_validation.value.splice(index, 1)
}

async function handleDeleteIngredientFromMeal(ingredient_id: number, meal_id: number, arr_index: number) {
    const response = await deleteEntity(`/meal/${ingredient_id}/${meal_id}`)

    if (response && response.ok) {
        removeEntry(arr_index)
    }
}

async function triggerMealEvent() {
    console.log('creating meal')

    console.log(meal_validation.value)

    if (check_meal_validation()) {
        const json = getFormDataInJSONFormat(`${props.formulate_type}_meal_form`)
        const response = await fetchResource(http_method.value, json, url.value, 'token')

        if (response && response.ok) {
            // update list of meals
            await getMeals()

            hideModal(modal_id)
        }
    } else {
        alertDanger()
        _alert("Fill out the required fields: 'Meal Name'. 'Name' and 'Amount' for each ingredient is required. Nutrient values may be zero.")
    }
}

</script>

<template>

    <FormulateIngredient formulate_type="create" />

    <div class="modal modal-xl fade Modal" tabindex="-1" :id="modal_id">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title"> {{ _formulate_type }} a meal </h3>
                    <button class="btn btn-lg ms-auto" data-bs-dismiss="modal">
                        <font-awesome-icon :icon="['fas', 'x']" />
                    </button>
                </div>

                <div class="modal-body">
                    <form :id="`${formulate_type}_meal_form`" @submit.prevent>

                        <AlertBox />

                        <label for="meal_name"> Meal name: </label>

                        <input style="width: 80%;"
                            @input="meal_name_validation = ValidateText($event, meal_name_message_validation, 'MealName', 'form-control form-control-md')"
                            class="form-control form-control-md" name="meal_name" type="text" :value="props.meal?.name">

                        <div ref="meal_name_message_validation" class="ml-2 invalid-feedback">
                        </div>

                        <div class="mt-2 mb-1">
                            <h5> Ingredients </h5>
                        </div>
                        <h6 class="ml-3" v-if="ingredientsData.length == 0"> Your meal has zero ingredients
                        </h6>
                        <div class="column">
                            <div class="row">
                                <template v-if="ingredientsData.length > 0">
                                    <div class="column form-group ml-4" v-for="(ingredient, index) in ingredientsData"
                                        :key="index" style="max-width: 200px;">

                                        <input :name="index + '-ingredient_id'" type="text"
                                            :value="ingredient.ingredient_id" style="display: none;">

                                        <IngredientInputModule :ingredient="ingredient" food_type="meal"
                                            :index="index" />

                                        <div class="mt-2 btn-group-md btn-group d-flex">
                                            <button v-if="ingredient.meal_id" type="button"
                                                class="btn-outline-danger btn btn-md"
                                                @click="handleDeleteIngredientFromMeal(ingredient.ingredient_id, ingredient.meal_id, index)">
                                                Remove <font-awesome-icon :icon="['fas', 'trash']" />
                                            </button>
                                            <button v-else type="button" class="btn-outline-danger btn btn-md"
                                                @click="removeEntry(index)">
                                                Remove <font-awesome-icon :icon="['fas', 'trash']" />
                                            </button>
                                        </div>

                                    </div>
                                </template>
                            </div>
                            <div class="ml-3 mt-3">
                                <h5> Select and click the ingredient you want to add </h5>
                                <div class="wrap">
                                    <div v-for="ingredient in ingredients" :key="ingredient.ingredient_id">
                                        <button type="button" @click="addIngredientToMeal(ingredient)"
                                            class="btn btn-secondary btn-md m-2">
                                            <h6>{{ ingredient['name'] }} </h6>
                                        </button>
                                    </div>
                                </div>
                                <div class="ml-3" v-if="ingredients && ingredients.length == 0">
                                    <h6> You don't have any ingredients </h6>
                                    <button type="button" class="btn-success btn btn-sm" data-bs-toggle="modal"
                                        data-bs-target="#create_ingredient_modal"
                                        @click="createOrEditIngredient = 'Edit'">
                                        <h6> Create ingredient </h6>
                                    </button>
                                </div>
                            </div>
                            <!--<section class="m-2">
                                <h4> Find ingredients with Kassal.app API </h4>

                                <form @submit.prevent>
                                    <div class="input-group m-1">
                                        <input class="form-control" v-model="api_search"
                                            placeholder="Search for ingredient" type="text">
                                        <button type="submit" class="btn btn-primary" @click="search_with_api()"> Find
                                            product </button>
                                    </div>
                                </form>

                                <div v-if="api_search_data.length > 0">
                                    <h4> Ingredients from your search: (Click to add) </h4>
                                    <div class="wrap">
                                        <div class="m-2" @click="addAPIProductToMeal(product, index)"
                                            v-for="(product, index) in api_search_data" :key="index"
                                            style="width: 30%;">
                                            <h5> {{ product['name'] }} </h5>
                                            <h6> Price: {{ product['current_price'] }} kr </h6>

                                            <img id="api_search_img" class="float-right" :src="product['image']"
                                                :alt="product['name']">
                                            <ul>
                                                <li v-for="nutrient in product['nutrition']" :key="nutrient">

                                                    {{ nutrient['display_name'] }}: {{ nutrient['amount'] }} {{
                                                        nutrient['unit'] }}

                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <h5 class="ml-4" v-if="api_search_data.length == 0 && api_search.length > 2"> Please
                                    click enter or button *Find product*, if already done, sorry did not find any
                                    products with your search: {{ api_search }} </h5>
                                <h5 class="ml-4" v-if="api_search.length != 0 && api_search.length < 3"> Your search: {{
                                    api_search }} is too short. Minium 3 letters </h5>
                            </section>-->
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-lg ml-1" @click="addEmptyIngredient()">
                        <font-awesome-icon :icon="['fas', 'plus']" /> Empty Ingredient
                    </button>
                    <button type="button" @click="triggerMealEvent()" class="btn btn-success btn-lg ml-1"> {{
                        _formulate_type }} Meal
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>