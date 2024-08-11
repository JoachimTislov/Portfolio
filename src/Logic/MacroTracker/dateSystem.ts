import { days_of_the_week_with_date, number_of_days_in_each_month } from '@/Data/MacroTracker'
import { check_if_number_is_less_than_10 } from './checkLogic/check_if_number_is_less_than_10'

export function getTodaysDate() {
  const date = new Date()
  return `${check_if_number_is_less_than_10(date.getDate())}-${check_if_number_is_less_than_10(date.getMonth() + 1)}-${date.getFullYear()}`
}

export function getTodaysDate_AmericanFormat() {
  const date = new Date()
  return `${check_if_number_is_less_than_10(date.getMonth() + 1)}-${check_if_number_is_less_than_10(date.getDate())}-${date.getFullYear()}`
}

export function getTodaysDate_FriendlyFormatDateInput() {
  // Have to edit it to format yyyy-mm-dd
  const date = new Date()
  return `${date.getFullYear()}-${check_if_number_is_less_than_10(date.getMonth() + 1)}-${check_if_number_is_less_than_10(date.getDate())}`
}

export function construct_dates_for_days_in_week(
  dayOfWeek: number,
  dayOfMonth: number,
  month: number,
  year: number
) {
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
