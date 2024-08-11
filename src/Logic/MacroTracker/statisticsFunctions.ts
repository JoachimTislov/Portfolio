import {
  eaten_nutrient_progression,
  labels,
  recommended_nutrient_data,
  stats,
  days_of_the_week_with_date,
  StatsToShow
} from './initVariables'
import type { Calender_data } from './types'
import { getDate } from './dateSystem'

export function calcNutrientStatsForTheWeek(calender_data: Calender_data) {
  // Adding all of the nutrients for the given week
  days_of_the_week_with_date.value.forEach((entry) => {
    const date = entry['Date']

    if (calender_data[date] && calender_data[date].length > 0) {
      for (const entry of calender_data[date]) {
        for (let i = 0; i < labels.length; i++) {
          stats.total_macros[i] += entry.meal[labels[i].toLocaleLowerCase()] as number

          if (stats.total_macros[i] > 0) {
            StatsToShow.value = true
          }
        }
      }
    }
  })

  for (let i = 0; i < labels.length; i++) {
    if (stats.average_macros[i] != 0) {
      stats.average_macros[i] = Math.round(stats.total_macros[i] / 7)
    }
  }

  console.log(stats)
}

export function setupNutrientProgressChartsData(calender_data: Calender_data) {
  const mealsEatenToday = calender_data[getDate()]

  if (mealsEatenToday) {
    for (const entry of mealsEatenToday) {
      eaten_nutrient_progression.calories[0] += entry.meal.calories
      eaten_nutrient_progression.protein[0] += entry.meal.protein
      eaten_nutrient_progression.carbohydrates[0] += entry.meal.carbohydrates
      eaten_nutrient_progression.fat[0] += entry.meal.fat
      eaten_nutrient_progression.sugar[0] += entry.meal.sugar
    }

    for (let i = 0; i < recommended_nutrient_data.length; i++) {
      console.log(eaten_nutrient_progression, recommended_nutrient_data)
      eaten_nutrient_progression[i] = [
        Math.round((eaten_nutrient_progression[i][0] / recommended_nutrient_data[i]) * 100)
      ]
    }
  }
}
