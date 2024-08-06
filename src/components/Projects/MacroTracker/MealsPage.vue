<script setup lang="ts">
import { getData, deleteEntity } from '@/Logic/MacroTracker/Ajax/ajax';
import { meals } from '@/Logic/MacroTracker/initVariables';
import type { Meal_with_ingredients } from '@/Logic/MacroTracker/types';
import { ref } from 'vue';


const storedSortValue = localStorage.getItem('meal_sort_value')
const sort_value = storedSortValue ? storedSortValue : 'Sort by'
const search_value = ''

const filtered_meals = ref<Meal_with_ingredients[] | undefined>([])

const user_id = localStorage.getItem('user_id')
const meals_response = await getData(`/personal_meals/${user_id}`)
meals.value = meals_response ? (await meals_response.json()) as Meal_with_ingredients[] : undefined

function sortArray(arr: Meal_with_ingredients[] | undefined, filterObject: string) {
    if (arr) {
        if (typeof arr[0][filterObject] === 'number') {
            //Descending order
            arr = arr.sort((a, b) => (b[filterObject] as unknown as number) - (a[filterObject] as unknown as number));
        } else if (typeof arr[0][filterObject] === 'string') {
            arr = arr.sort((a, b) => (a[filterObject] as unknown as string).localeCompare((b[filterObject] as unknown as string)));
        }
    }
    return arr
}

function filterArrayByName(searchInput: string, arr: Meal_with_ingredients[] | undefined) {
    if (arr) {
        const filtered_arr = arr.filter(function (entry) {
            return entry['name'].toLowerCase().includes(searchInput.toLowerCase())
        })

        return filtered_arr
    }

    return arr
}

function checkMeals() {
    if (search_value.length == 0 && sort_value == 'Sort By') {
        return meals.value
    }

    if (sort_value != 'Sort By') {
        filtered_meals.value = sortArray(meals.value, sort_value)
    }

    if (search_value.length > 0) {
        filtered_meals.value = filterArrayByName(search_value, meals.value)
    }

    return filtered_meals.value
}

</script>



<template>

    <section class="card mb-2 m-3">
        <div class="card-header">
            <!--<button class="btn-danger btn btn-md float-right">
                <font-awesome-icon :icon="['fas', 'x']" />
            </button>-->
            <h2 class="m-0"> Your meals </h2>
        </div>

        <div id="personal_meal_alert" style="display: none;" class="mt-5 alert alert-dismissible alert-success"></div>

        <div class="card-body input-group">

            <input class="form-control form-control-lg" id="search_meal"
                @input="filtered_meals = filterArrayByName(search_value, meals)" type="text" placeholder="Search"
                v-model="search_value">

            <select class="form-control form-control-lg" id="select_sort_meals"
                @change="filtered_meals = sortArray(meals, sort_value)" v-model="sort_value">
                <option disabled selected> Sort by </option>
                <option value="name"> Name </option>
                <option value="protein"> Protein </option>
                <option value="calories"> Calories </option>
                <option value="carbohydrates"> Carbohydrates </option>
                <option value="fat"> Fat </option>
                <option value="sugar"> Sugar </option>
            </select>


            <button class="create_button btn-success btn btn-sm">
                Create Meal
            </button>

        </div>

        <div class="card">
            <div class="wrap">
                <div v-for="meal in checkMeals()" :id="`meal-${meal['meal_id']}`" :key="meal['meal_id']"
                    class="border border-3 border-secondary m-2 p-4" style="width: 100%;">
                    <div class="float-right">
                        <button :id="'showAndHideIngredients_' + 'meal-' + meal['meal_id']" type="button"
                            class="mr-2 btn btn-info btn-sm">
                            Show ingredients
                        </button>

                        <button class="btn-info btn btn-sm">
                            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                        </button>

                        <button
                            @click="deleteEntity('/meal/' + 'meal-' + meal['meal_id'], 'meal', 'personal_meal_alert')"
                            class="btn-danger btn btn-sm">
                            <font-awesome-icon :icon="['fas', 'trash']" />
                        </button>
                    </div>

                    <div class="card-body">
                        <h4 class="card-title"> Meal Name: {{ meal['name'] }} </h4>
                        <details class="ml-2">
                            <summary> Total Macros: </summary>
                            <h5 style="width: 200px;" class="border border-info border-1 m-2 p-2"> Carbohydrates: {{
                                meal['carbohydrates'] }}g </h5>
                            <h5 style="width: 200px;" class="border border-info border-1 m-2 p-2"> Calories: {{
                                meal['calories'] }}kcal </h5>
                            <h5 style="width: 200px;" class="border border-info border-1 m-2 p-2"> Protein: {{
                                meal['protein'] }}g </h5>
                            <h5 style="width: 200px;" class="border border-info border-1 m-2 p-2"> Fat: {{ meal['fat']
                                }}g </h5>
                            <h5 style="width: 200px;" class="border border-info border-1 m-2 p-2"> Sugar: {{
                                meal['sugar'] }}g </h5>
                        </details>

                        <div class="mt-2" :id="'ingredients_div_' + meal['meal_id']" style="display: none;">
                            <h5 style="text-decoration: underline"> Ingredients: </h5>
                            <div class="wrap mt-2">
                                <template v-if="meal['ingredients'].length > 0">
                                    <div class="column" v-for="ingredient in meal['ingredients']"
                                        :key="ingredient['name']">
                                        <ul class="list-group mt-4">
                                            <li class="list-group-item list-group-item-info mr-3"> {{ ingredient['name']
                                                }},
                                                {{ ingredient['amount'] }} </li>
                                            <li class="list-group-item mr-3"> Protein: {{ ingredient['protein'] }}g
                                            </li>
                                            <li class="list-group-item mr-3"> Calories: {{ ingredient['calories'] }}kcal
                                            </li>
                                            <li class="list-group-item mr-3"> Carbohydrates: {{
                                                ingredient['carbohydrates']
                                                }}g </li>
                                            <li class="list-group-item mr-3"> Fat: {{ ingredient['fat'] }}g </li>
                                            <li class="list-group-item mr-3"> Sugar: {{ ingredient['sugar'] }}g </li>
                                        </ul>
                                        <div class="ml-2">
                                            <button
                                                @click="deleteEntity('/meal/' + ingredient['ingredient_id'] + '/' + meal['meal_id'], 'removing ingredient from meal', 'personal_meal_alert')"
                                                class="btn-outline-danger btn btn-md"> Remove </button>
                                            <button class="btn btn-outline-info btn-md">
                                                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                                            </button>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="meal['ingredients'].length == 0">
                                    <h6> The meal: {{ meal['name'] }} has zero ingredients </h6>
                                    <button class="btn-outline-info btn btn-lg">
                                        <font-awesome-icon :icon="['fas', 'pen-to-square']" /> {{ meal['name'] }}
                                    </button>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="ml-5 mb-2 mt-2" v-if="meals && meals.length == 0">
            <h4 v-if="search_value == ''"> You don't have any personal meals </h4>
            <h4 v-if="search_value != ''"> You don't have any personal meals with name: {{ search_value }} </h4>
            <button class="create_button btn-success btn btn-sm">
                <h5> Create a meal </h5>
            </button>
        </div>
    </section>

</template>