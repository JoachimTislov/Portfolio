import type { Ref } from 'vue'

export type Meal_and_calender_data = Meal_and_calender_data_entry[]

export type Meal_and_calender_data_entry = {
  calender_id: number
  date: string
  meal_name: string
  time_of_day: string
}

export type Average_macros_data = Average_macros_data_entry[]

export type Average_macros_data_entry = {
  calender_id: number
  date: string
  meal: Meal
  time_of_day: string
}

export type Average_macros_this_week = { [key: string]: number }

export type Meal = {
  [key: string]: string | number
  name: string
  calories: number
  carbohydrates: number
  fat: number
  meal_id: number
  protein: number
  sugar: number
  user_id: number
}

export type Meal_with_ingredients = Meal & {
  [key: string]: string | number | Ingredients

  ingredients: Ingredients
}

export type Meals_for_time_of_day = { [key: string]: Meal_and_calender_data }

export type Ingredients = Ingredient[]

export type Ingredient = {
  [key: string]: string | number
  ingredient_id: number
  name: string
  amount: number
  protein: number
  calories: number
  carbohydrates: number
  fat: number
  sugar: number
}

export type IngredientModal = {
  [key: string]: {
    formulate_type: string
    ingredient?: Ingredient | undefined
  }
}

export type mealModal = {
  [key: string]: {
    formulate_type: string
    meal?: Meal_with_ingredients | undefined
  }
}

export type Form_configuration = IngredientInfo[]

export type IngredientInfo = {
  identifier: string
  validation_type: string
  inputType: string
  value: string | number
  class: string
  unit?: string
}

export type Validation_array = { [key: string]: boolean }

export type ValidationRefs = { [key: string]: Ref<HTMLElement | null> }
