import { schedule } from '@/Data/MacroTracker'
import { getData } from '../ajax'
import type {
  Meals_for_time_of_day,
  Meal_and_calender_data,
  Meal_and_calender_data_entry
} from '../../types'
import { calender_date, meals_for_given_date, zero_meals_to_show } from '../../initVariables'

export async function get_meals_for_given_date() {
  const user_id = localStorage.getItem('user_id')
  const response = await getData(`/meal_calender/${user_id}/${calender_date.value}`)

  if (response) {
    const meal_calender_data: Meal_and_calender_data = await response.json()

    // Initializing
    const meals_for_time_of_day: Meals_for_time_of_day = {
      Breakfast: [],
      Lunch: [],
      Dinner: [],
      Supper: [],
      Night: []
    }

    let count = 0
    for (const [key, time] of Object.entries(schedule)) {
      meal_calender_data.forEach((meal: Meal_and_calender_data_entry) => {
        const hour = parseInt(meal['time_of_day'].split(':')[0])

        if (hour >= time.Start && hour <= time.End) {
          meals_for_time_of_day[key].push(meal)
        }
      })

      if (meals_for_time_of_day[key].length > 0) {
        zero_meals_to_show.value = false
      } else if (meals_for_time_of_day[key].length == 0) {
        count++
      }

      if (Object.keys(meals_for_time_of_day).length == count) {
        zero_meals_to_show.value = true
      }
    }

    meals_for_given_date.value = meals_for_time_of_day
  }
}
