import { schedule } from '@/Data/MacroTracker'
import { calender_data, meals_for_time_of_day } from './initVariables'
import type { calender_data_entry } from './types'

export function structureCalenderData() {
  for (const date of Object.keys(calender_data.value)) {
    for (const calender_entry of calender_data.value[date]) {
      for (const [key, time] of Object.entries(schedule)) {
        const hour = parseInt(calender_entry.time_of_day.split(':')[0])

        if (hour >= time.Start && hour <= time.End) {
          ;(meals_for_time_of_day.value[date][key] as calender_data_entry[]).push(calender_entry)
        }
      }
    }
  }
}
