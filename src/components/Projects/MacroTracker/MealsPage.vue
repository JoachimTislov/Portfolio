<script setup lang="ts">
import { getData, deleteEntity } from '@/Logic/MacroTracker/Ajax/ajax'
import { meals } from '@/Logic/MacroTracker/initVariables'
import type { Meal_with_ingredients } from '@/Logic/MacroTracker/types'
import { ref } from 'vue'
import { splitArrayWithRespectToSortedArray } from '@/Logic/MacroTracker/splitArrayWithRespectToSortedArray'
import { filterArrayByName, sortArray } from '@/Logic/MacroTracker/sorting'
import { checkFilterForArray } from '@/Logic/MacroTracker/checkLogic/checkFilterForArray'
import { CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody } from '@coreui/vue';

const storedSortValue = localStorage.getItem('meal_sort_value')
const sort_value = storedSortValue ? storedSortValue : 'Sort by'
const search_value = ''

const filtered_meals = ref<Meal_with_ingredients[] | undefined>([])

const user_id = localStorage.getItem('user_id')
const meals_response = await getData(`/personal_meals/${user_id}`)
meals.value = meals_response
    ? ((await meals_response.json()) as Meal_with_ingredients[])
    : undefined
</script>

<template>
    <section class="card" style="height: 100vh">
        <div class="card-header">
            <h2 class="m-0">Your meals</h2>

            <div id="personal_meal_alert" style="display: none" class="mt-5 alert alert-dismissible alert-success">
            </div>

            <div class="m-2 input-group">
                <input class="form-control form-control-lg" id="search_meal"
                    @input="filtered_meals = filterArrayByName(meals, search_value)" type="text" placeholder="Search"
                    v-model="search_value" />

                <select class="form-control form-control-lg" id="select_sort_meals"
                    @change="filtered_meals = sortArray(meals, sort_value)" v-model="sort_value">
                    <option disabled selected>Sort by</option>
                    <option value="name">Name</option>
                    <option value="protein">Protein</option>
                    <option value="calories">Calories</option>
                    <option value="carbohydrates">Carbohydrates</option>
                    <option value="fat">Fat</option>
                    <option value="sugar">Sugar</option>
                </select>

                <button class="create_button btn-success btn btn-md">Create Meal</button>
            </div>
        </div>

        <div class="card-body">
            <div class="mealsList">
                <div v-for="mealChunk in splitArrayWithRespectToSortedArray(checkFilterForArray(meals, search_value, sort_value))"
                    :key="mealChunk[0].meal_id" style="width: 100%">
                    <CAccordion flush>
                        <CAccordionItem v-for="meal in mealChunk" :id="`meal-${meal['meal_id']}`" :key="meal['meal_id']"
                            class="m-2 mt-0 border border-3 border-secondary">
                            <CAccordionHeader>

                                <h4> {{ meal['name'] }}</h4>

                            </CAccordionHeader>
                            <CAccordionBody>

                                <label for="total_macros"> Total Macros </label>
                                <div class="d-flex flex-wrap" id="total_macros">
                                    <small class="rounded border border-1 p-2 m-1">Protein: {{ meal['protein']
                                        }}g</small>
                                    <small class="rounded border border-1 p-2 m-1">Calories: {{ meal['calories']
                                        }}kcal</small>
                                    <small class="rounded border border-1 p-2 m-1">Carbohydrates: {{
                                        meal['carbohydrates']
                                    }}g</small>
                                    <small class="rounded border border-1 p-2 m-1">Fat: {{ meal['fat']
                                        }}g</small>
                                    <small class="rounded border border-1 p-2 m-1">Sugar: {{ meal['sugar']
                                        }}g</small>
                                </div>

                                <h5>Ingredients:</h5>
                                <div class="wrap">
                                    <template v-if="meal['ingredients'].length > 0">
                                        <div class="m-1" v-for="ingredient in meal['ingredients']"
                                            :key="ingredient['name']">
                                            <ul class="list-group">
                                                <li class="list-group-item list-group-item-info mr-3">
                                                    {{ ingredient['name'] }}
                                                </li>
                                                <li class="list-group-item">
                                                    Amount: {{ ingredient['amount'] }}
                                                </li>
                                                <li class="list-group-item mr-3">Protein: {{
                                                    ingredient['protein'] }}g
                                                </li>
                                                <li class="list-group-item mr-3">Calories: {{
                                                    ingredient['calories']
                                                }}kcal</li>
                                                <li class="list-group-item mr-3">
                                                    Carbohydrates: {{ ingredient['carbohydrates'] }}g
                                                </li>
                                                <li class="list-group-item mr-3">Fat: {{ ingredient['fat'] }}g
                                                </li>
                                                <li class="list-group-item mr-3">Sugar: {{ ingredient['sugar']
                                                    }}g</li>
                                            </ul>
                                            <div class="mt-2 btn-group-md btn-group d-flex">
                                                <button @click="
                                                    deleteEntity(
                                                        `/meal/${ingredient['ingredient_id']}/${meal['meal_id']}`,
                                                        'removing ingredient from meal',
                                                        'personal_meal_alert'
                                                    )
                                                    " class="btn-outline-danger btn btn-md">
                                                    Remove <font-awesome-icon :icon="['fas', 'trash']" />
                                                </button>
                                                <button class="btn btn-outline-info btn-md">
                                                    Edit <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                                                </button>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-if="meal['ingredients'].length == 0">
                                        <h6>The meal: {{ meal['name'] }} has zero ingredients</h6>
                                        <button class="btn-outline-info btn btn-lg">
                                            <font-awesome-icon :icon="['fas', 'pen-to-square']" /> {{
                                                meal['name'] }}
                                        </button>
                                    </template>
                                </div>
                            </CAccordionBody>
                        </CAccordionItem>
                    </CAccordion>
                </div>
            </div>
        </div>

        <div class="ml-5 mb-2 mt-2" v-if="meals && meals.length == 0">
            <h4 v-if="search_value == ''">You don't have any personal meals</h4>
            <h4 v-if="search_value != ''">
                You don't have any personal meals with name: {{ search_value }}
            </h4>
            <button class="create_button btn-success btn btn-sm">
                <h5>Create a meal</h5>
            </button>
        </div>
    </section>
</template>

<style scoped>
.mealsList {
    display: flex;
    flex-direction: row;

    justify-content: center;
}

@media (max-width: 1000px) {
    .mealsList {
        flex-direction: column;
    }
}
</style>
