import { number_of_days_in_each_month } from '@/Data/MacroTracker'
import { check_if_number_is_less_than_10 } from './checkLogic/check_if_number_is_less_than_10'
import {
  calender_date,
  days_of_the_week_index,
  selectedDate,
  days_of_the_week_with_date
} from './initVariables'

const determineDateObject = (date?: string) => {
  return date ? new Date(date) : new Date()
}

export function getDate(date?: string) {
  const dateObject = determineDateObject(date)
  return `${check_if_number_is_less_than_10(dateObject.getDate())}-${check_if_number_is_less_than_10(dateObject.getMonth() + 1)}-${dateObject.getFullYear()}`
}

export function getDate_AmericanFormat(date?: string) {
  const dateObject = determineDateObject(date)
  return `${check_if_number_is_less_than_10(dateObject.getMonth() + 1)}-${check_if_number_is_less_than_10(dateObject.getDate())}-${dateObject.getFullYear()}`
}

export function getTodaysDate_FriendlyFormatDateInput(date?: string) {
  // Have to edit it to format yyyy-mm-dd
  const dateObject = determineDateObject(date)
  return `${dateObject.getFullYear()}-${check_if_number_is_less_than_10(dateObject.getMonth() + 1)}-${check_if_number_is_less_than_10(dateObject.getDate())}`
}

export function getDayOfTheWeek_Monday_to_Sunday(date?: string) {
  const dateObject = determineDateObject(date)
  return dateObject.getDay() == 0 ? 6 : dateObject.getDay() - 1
}

export function getDayOf_Week_and_Month_year_and_monthOfYear(date?: string) {
  const dateObject = determineDateObject(date)

  const dayOfWeek = getDayOfTheWeek_Monday_to_Sunday(date)

  const dayOfMonth = dateObject.getDate()
  const month = dateObject.getMonth() + 1
  const year = dateObject.getFullYear()

  return [dayOfWeek, dayOfMonth, month, year]
}

export function construct_dates_for_days_in_week(date?: string) {
  const [dayOfWeek, dayOfMonth, ...rest] = getDayOf_Week_and_Month_year_and_monthOfYear(date)
  let [month, year] = rest

  console.log(dayOfMonth, dayOfWeek)

  /*We want to start at the beginning of the week*/
  let start_of_week_date = dayOfMonth - dayOfWeek

  /* Checking if its in the beginning of a month */
  if (start_of_week_date < 1) {
    /*Checking if we are moving to previous year */
    if (month == 0) {
      month = 11
      year -= 1
    } else {
      month -= 1
    }

    const days_in_previous_month = number_of_days_in_each_month[month]['Days']

    /* We are adding since start_of_week_date is less than 1, zero wont make a difference */
    start_of_week_date = days_in_previous_month + start_of_week_date
  }

  for (let i = 0; i < days_of_the_week_with_date.value.length; i++) {
    days_of_the_week_with_date.value[i]['Date'] =
      check_if_number_is_less_than_10(start_of_week_date) +
      '-' +
      check_if_number_is_less_than_10(month) +
      '-' +
      year

    if (start_of_week_date == number_of_days_in_each_month[month]['Days']) {
      start_of_week_date = 0
      month += 1

      if (month == 12) {
        month = 0
        year += 1
      }
    }

    start_of_week_date += 1
  }
}

export function update_calender_info(event: Event) {
  const value = (event.target as HTMLInputElement).value
  selectedDate.value = value

  // Recalculate week
  construct_dates_for_days_in_week(value)

  // dd-mm-yyyy
  calender_date.value = getDate(value)
  days_of_the_week_index.value = getDayOfTheWeek_Monday_to_Sunday(value)
}
