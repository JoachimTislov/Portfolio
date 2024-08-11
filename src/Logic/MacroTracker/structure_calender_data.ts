import { schedule } from '@/Data/MacroTracker'
import { getTodaysDate } from './dateSystem'
import type { calender_data_entry } from './types'
import { zero_meals_to_show, calender_data, meals_for_time_of_day } from './initVariables'

export function structureCalenderData() {
  if (calender_data.value) {
    const date = getTodaysDate()
    console.log(calender_data.value[date])
    for (const [key, time] of Object.entries(schedule)) {
      calender_data.value[date].forEach((meal: calender_data_entry) => {
        const hour = parseInt(meal['time_of_day'].split(':')[0])

        if (hour >= time.Start && hour <= time.End) {
          meals_for_time_of_day.value[key].push(meal)
          zero_meals_to_show.value = false
        }
      })
    }
  }
}
