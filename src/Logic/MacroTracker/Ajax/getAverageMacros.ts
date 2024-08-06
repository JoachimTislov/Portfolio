import { days_of_the_week_with_date } from '@/Data/MacroTracker'
import { routeToPage } from '../routeToPage'
import type { Average_macros_data, Average_macros_data_entry } from '../types'
import { getData } from './ajax'

export async function get_average_macros() {
  const user_id = localStorage.getItem('user_id')
  if (!user_id) routeToPage('macroLogin')

  const url = `/average_macros/${user_id}`

  const response = await getData(url)

  const average_macros_data: Average_macros_data = await response?.json()

  console.log('Average macros date:', average_macros_data)

  // Initializing
  const average_macros_this_week: { [key: string]: number } = {
    Calories: 0,
    Protein: 0,
    Carbohydrates: 0,
    Fat: 0,
    Sugar: 0
  }

  if (average_macros_data) {
    // Adding all of the nutrients for the given week
    days_of_the_week_with_date.value.forEach((entry) => {
      average_macros_data.forEach((line: Average_macros_data_entry) => {
        if (entry['Date'] == line['date']) {
          average_macros_this_week['Protein'] += line['meal']['protein']
          average_macros_this_week['Calories'] += line['meal']['calories']
          average_macros_this_week['Carbohydrates'] += line['meal']['carbohydrates']
          average_macros_this_week['Fat'] += line['meal']['fat']
          average_macros_this_week['Sugar'] += line['meal']['sugar']
        }
      })
    })

    // Calculating the average macro for the given week
    for (const key in average_macros_this_week) {
      average_macros_this_week[key] = Math.round(average_macros_this_week[key] / 7)
    }
  }

  return average_macros_this_week
}
