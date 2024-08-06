<script setup lang="ts">
import { getData, deleteEntity } from '@/Logic/MacroTracker/Ajax/ajax';
import { checkFilterForArray } from '@/Logic/MacroTracker/checkLogic/checkFilterForArray';
import { ingredients } from '@/Logic/MacroTracker/initVariables';
import type { Ingredients } from '@/Logic/MacroTracker/types';
import { filterArrayByName, sortArray } from '@/Logic/MacroTracker/sorting';
import { ref } from 'vue';
import { CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody } from '@coreui/vue';
import { splitArrayWithRespectToSortedArray } from '@/Logic/MacroTracker/splitArrayWithRespectToSortedArray'

const storedSortValue = localStorage.getItem('meal_sort_value')
const sort_value = storedSortValue ? storedSortValue : 'Sort by'
const search_value = ''

const filtered_ingredients = ref<Ingredients | undefined>([])

const user_id = localStorage.getItem('user_id')
const ingredients_response = await getData(`/personal_ingredients/${user_id}`)
ingredients.value = ingredients_response ? (await ingredients_response.json()) as Ingredients : undefined

</script>

<template>
    <section class="card" style="height: 100vh">
        <div class="card-header">
            <h2 class="m-0"> Your ingredients </h2>


            <div id="personal_ingredient_alert" style="display: none;"
                class="mt-5 alert alert-dismissible alert-success">
            </div>

            <div class="m-2 input-group">
                <input class="form-control form-control-lg"
                    @input="filtered_ingredients = filterArrayByName(ingredients, search_value)" type="text"
                    placeholder="Search" v-model="search_value">

                <select class="form-control form-control-lg" id="select_sort_ingredients"
                    @change="filtered_ingredients = sortArray(ingredients, sort_value)" v-model="sort_value">
                    <option disabled selected> Sort by </option>
                    <option value="name"> Name </option>
                    <option value="protein"> Protein </option>
                    <option value="calories"> Calories </option>
                    <option value="carbohydrates"> Carbohydrates </option>
                    <option value="fat"> Fat </option>
                    <option value="sugar"> Sugar </option>
                </select>

                <RouterLink class="create_button btn-success btn btn-md" :to="{ name: 'macroCreateIngredient' }">
                    Create Ingredient
                </RouterLink>
            </div>
        </div>

        <div class="card-body">
            <div class="ingredientsList">
                <div v-for="ingredientChunk in splitArrayWithRespectToSortedArray(checkFilterForArray(ingredients, search_value, sort_value))"
                    :key="ingredientChunk[0].ingredient_id" style="width: 100%">
                    <CAccordion flush>
                        <CAccordionItem v-for="ingredient in ingredientChunk"
                            :id="'ingredient' + ingredient['ingredient_id']" :key="ingredient['ingredient_id']"
                            class="border border-3 border-secondary">
                            <CAccordionHeader>
                                <h4>{{ ingredient['name'] }} </h4>
                            </CAccordionHeader>
                            <CAccordionBody>

                                <ul class="list-group">
                                    <li class="list-group-item"> Amount: {{ ingredient['amount'] }} </li>
                                    <li class="list-group-item"> Protein: {{ ingredient['protein'] }}g </li>
                                    <li class="list-group-item"> Calories: {{ ingredient['calories'] }}kcal </li>
                                    <li class="list-group-item"> Carbohydrates: {{ ingredient['carbohydrates'] }}g </li>
                                    <li class="list-group-item"> Fat: {{ ingredient['fat'] }}g </li>
                                    <li class="list-group-item"> Sugar: {{ ingredient['sugar'] }}g </li>
                                </ul>

                                <div class="d-flex btn-group mt-2">
                                    <button class="btn btn-info">
                                        Edit <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                                    </button>
                                    <button
                                        @click="deleteEntity(`/ingredient/${ingredient['ingredient_id']}`, 'ingredient', 'personal_ingredient_alert')"
                                        class="btn btn-danger">
                                        Delete <font-awesome-icon :icon="['fas', 'trash']" />
                                    </button>
                                </div>
                            </CAccordionBody>
                        </CAccordionItem>
                    </CAccordion>
                </div>
            </div>
        </div>

        <div class="ml-5 mb-2 mt-2" v-if="ingredients && ingredients.length == 0">
            <h4 v-if="search_value == ''"> You don't have any personal ingredients </h4>
            <h4 v-if="search_value != ''"> You don't have any personal ingredients with name: {{ search_value }}
            </h4>
            <RouterLink class="create_button btn-success btn btn-md" :to="{ name: 'macroCreateIngredient' }">
                Create Ingredient
            </RouterLink>
        </div>
    </section>
</template>


<style scoped>
.ingredientsList {
    display: flex;
    flex-direction: row;

    justify-content: center;
}

@media (max-width: 766px) {
    .ingredientsList {
        flex-direction: column;
    }
}
</style>