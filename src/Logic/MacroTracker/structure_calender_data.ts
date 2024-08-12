import { schedule } from '@/Data/MacroTracker'
import {
  calender_data,
  dates_within_selected_period,
  meals_for_time_of_day,
  selected_end_date,
  selected_start_date,
  zero_meals_for_time_period
} from './initVariables'
import type { Meals_for_time_of_day } from './types'
import { convertToInputDateFormat, reverseInputDateFormat } from './dateSystem'

export function structureCalenderData(identifier?: string) {
  const keys: string[] = sortArrayToAscendingOrder(Object.keys(calender_data.value))
  zero_meals_for_time_period.value = false

  const start_date = reverseInputDateFormat(selected_start_date.value)
  const end_date = reverseInputDateFormat(selected_end_date.value)

  const start_index = keys.indexOf(start_date)
  const end_index = keys.indexOf(end_date)

  dates_within_selected_period.value = findRangeOfDates(
    keys,
    start_index,
    start_date,
    end_index,
    end_date,
    identifier
  )

  meals_for_time_of_day.value = {}
  for (const date of dates_within_selected_period.value) {
    const typedMealsForTimeOfDay = meals_for_time_of_day.value as Meals_for_time_of_day
    typedMealsForTimeOfDay[date] = {
      zero_meals_to_show: true,
      meal_periods: {
        Breakfast: [],
        Lunch: [],
        Dinner: [],
        Supper: [],
        Night: []
      }
    }
    if (calender_data.value[date]) {
      typedMealsForTimeOfDay[date].zero_meals_to_show = false
      for (const calender_entry of calender_data.value[date]) {
        for (const [key, time] of Object.entries(schedule)) {
          const hour = parseInt(calender_entry.time_of_day.split(':')[0])

          if (hour >= time.Start && hour <= time.End) {
            typedMealsForTimeOfDay[date].meal_periods[key].push(calender_entry)
          }
        }
      }
    }
  }
}

function sortArrayToAscendingOrder(arr: string[]) {
  for (let i = 1; i < arr.length; i++) {
    const i_key = arr[i]
    const [i_day, i_month, i_year] = arr[i].split('-')

    let j = i - 1

    while (
      (j >= 0 &&
        arr[j].split('-')[0] > i_day &&
        arr[j].split('-')[1] == i_month &&
        arr[j].split('-')[2] == i_year) ||
      (j >= 0 && arr[j].split('-')[1] > i_month && arr[j].split('-')[2] == i_year) ||
      (j >= 0 && arr[j].split('-')[2] > i_year)
    ) {
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = i_key
  }

  return arr
}

function findRangeOfDates(
  arr: string[],
  start_index: number,
  start_date: string,
  end_index: number,
  end_date: string,
  identifier: string | undefined
) {
  if (start_date == end_date) {
    return [start_date]
  }

  const [s_o_day, s_o_month, s_o_year] = start_date.split('-')
  const [e_o_day, e_o_month, e_o_year] = end_date.split('-')

  if (
    (s_o_day > e_o_day && s_o_month == e_o_month && s_o_year == e_o_year) ||
    (s_o_month > e_o_month && s_o_year == e_o_year) ||
    s_o_year > e_o_year
  ) {
    if (identifier == 'start') {
      selected_end_date.value = convertToInputDateFormat(start_date)
      return [start_date]
    } else {
      selected_start_date.value = convertToInputDateFormat(end_date)
      return [end_date]
    }
  }

  if (start_index !== -1 && end_index !== -1) {
    return arr.slice(start_index, end_index + 1)
  } else {
    const keys = JSON.parse(JSON.stringify(arr))

    let a, b

    for (const value of keys) {
      const [day, month, year] = value.split('-')

      if (
        (s_o_day < day && s_o_month == month && s_o_year == year) ||
        (s_o_month < month && s_o_year == year) ||
        s_o_year < year
      ) {
        a = arr.indexOf(value)
        break
      }
    }

    for (const value of keys.reverse()) {
      const [day, month, year] = value.split('-')

      if (
        (e_o_day > day && e_o_month == month && e_o_year == year) ||
        (e_o_month > month && e_o_year == year) ||
        e_o_year > year
      ) {
        b = arr.indexOf(value) + 1
        break
      }
    }

    if (!a) {
      zero_meals_for_time_period.value = true
      return [start_date, end_date]
    }

    return arr.slice(a, b)
  }
}
