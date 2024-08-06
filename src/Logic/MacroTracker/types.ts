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

export type Meals = Meal[]

export type Meal = {
  [key: string]: string | number | Ingredients

  name: string
  calories: number
  carbohydrates: number
  fat: number
  meal_id: number
  protein: number
  sugar: number
  user_id: number
}

export interface Meal_with_ingredients extends Meal {
  ingredients: Ingredients
}

export type Meals_for_time_of_day = { [key: string]: Meal_and_calender_data }

export type Ingredients = {
  ingredient_id: number
  name: string
  amount: number
  protein: number
  calories: number
  carbohydrates: number
  fat: number
  sugar: number
}[]
