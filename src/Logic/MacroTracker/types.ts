import type { Ref } from 'vue'

export type Calender_data = {
  [key: string]: calender_data_entry[]
}

export type calender_data_entry = {
  calender_id: number
  date: string
  meal: Meal
  time_of_day: string
}

export type macros_statistics = {
  series: number[]
  options: {
    [key: string]: string[]
  }
}

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

type MealPeriods = {
  [key: string]: calender_data_entry[]
  Breakfast: calender_data_entry[]
  Lunch: calender_data_entry[]
  Dinner: calender_data_entry[]
  Supper: calender_data_entry[]
  Night: calender_data_entry[]
}

export type Meals_for_time_of_day = {
  [date: string]: {
    meal_periods: MealPeriods
    zero_meals_to_show: boolean
  }
}

export type Ingredients = Ingredient[]

export type Ingredient = {
  [key: string]: string | number | undefined
  ingredient_id: number
  meal_id?: number
  name: string
  amount: number
  protein: number
  calories: number
  carbohydrates: number
  fat: number
  sugar: number
}

export type validation_Object = { [key: string]: boolean }

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

export type UserInfo = { [key: string]: string }

export type User_input_field = {
  inputType: string
  placeholder: string
  validate_type: string
  identifier: string
  class: string
  attachment?: string
  type?: string
  value?: string
}
