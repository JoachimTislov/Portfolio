import { days_of_the_week_with_date } from '@/Data/MacroTracker'
import { routeToPage } from '../../routeToPage'
import type { Average_macros_data, Average_macros_data_entry } from '../../types'
import { getData } from '../ajax'
import { average_macros_this_week } from '../../initVariables'

export async function get_average_macros() {
  const user_id = localStorage.getItem('user_id')
  if (!user_id) routeToPage('macroLogin')

  const url = `/average_macros/${user_id}`

  const response = await getData(url)

  const average_macros_data: Average_macros_data = await response?.json()

  // Initializing
  const average_macros: { [key: string]: number } = {
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    sugar: 0
  }

  if (average_macros_data) {
    console.log(average_macros_data)
    // Adding all of the nutrients for the given week
    days_of_the_week_with_date.value.forEach((entry) => {
      average_macros_data.forEach((line: Average_macros_data_entry) => {
        if (entry['Date'] == line['date']) {
          for (const key of Object.keys(average_macros)) {
            average_macros[key] += line.meal[key] as number
          }
        }
      })
    })

    // Calculating the average macro for the given week
    for (const key in average_macros) {
      average_macros[key] = Math.round(average_macros[key] / 7)
    }
  }

  console.log(average_macros)

  average_macros_this_week.value = average_macros
}
