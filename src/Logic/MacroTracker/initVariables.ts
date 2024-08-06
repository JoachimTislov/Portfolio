import { ref, type Ref } from 'vue'
import type {
  Average_macros_this_week,
  Ingredients,
  Meal_with_ingredients,
  Meals_for_time_of_day
} from './types'
import { get_meals_for_given_date } from './Ajax/getMealsForGivenDate'
import { fetchResource, getData } from './Ajax/ajax'
import { check_if_number_is_less_than_10 } from './checkLogic/check_if_number_is_less_than_10'
import user_icon from '@/assets/Icons/user-icon.png'
import { routeToPage } from './routeToPage'

// Init html div alert elements
export const login_alert = ref<HTMLElement | null>(null)
export const create_ingredient_alert = ref<HTMLElement | null>(null)

const storedUsername = localStorage.getItem('username')
export const username = ref<string>(storedUsername ? storedUsername : 'Peddi')
export const password = ref<string>('peder@123')

export const login_validation: { [key: string]: Ref<boolean> } = {
  Username: ref<boolean>(true),
  Password: ref<boolean>(true)
}

export const validation_messages: {
  [key: string]: {
    [key: string]: Ref<HTMLElement | null>
  }
} = {
  login: {
    username: ref<HTMLElement | null>(null),
    password: ref<HTMLElement | null>(null)
  },
  register: {
    username: ref<HTMLElement | null>(null),
    password: ref<HTMLElement | null>(null),
    confirm_password: ref<HTMLElement | null>(null),
    name: ref<HTMLElement | null>(null),
    weight: ref<HTMLElement | null>(null),
    height: ref<HTMLElement | null>(null),
    age: ref<HTMLElement | null>(null),
    gender: ref<HTMLElement | null>(null),
    activity_lvl: ref<HTMLElement | null>(null),
    email: ref<HTMLElement | null>(null)
  },
  create_ingredient: {
    name: ref<HTMLElement | null>(null),
    amount: ref<HTMLElement | null>(null),
    protein: ref<HTMLElement | null>(null),
    calories: ref<HTMLElement | null>(null),
    carbohydrates: ref<HTMLElement | null>(null),
    fat: ref<HTMLElement | null>(null),
    sugar: ref<HTMLElement | null>(null)
  }
}

export const mealName_validation_message = ref<HTMLElement | null>(null)
export const nutrient_validation_message = ref<HTMLElement | null>(null)
export const ingredientName_validation_message = ref<HTMLElement | null>(null)
export const amount_validation_message = ref<HTMLElement | null>(null)
export const hour_validation_message = ref<HTMLElement | null>(null)
export const minutes_validation_message = ref<HTMLElement | null>(null)

export function initAlertElements() {
  console.log('init elements')

  for (const category of Object.keys(validation_messages)) {
    for (const element of Object.keys(validation_messages[category])) {
      validation_messages[category][element].value?.focus()
    }
  }

  login_alert.value?.focus()
  profile_alert.value?.focus()
  create_ingredient_alert.value?.focus()

  mealName_validation_message.value?.focus()
  nutrient_validation_message.value?.focus()
  ingredientName_validation_message.value?.focus()
  amount_validation_message.value?.focus()
  hour_validation_message.value?.focus()
  minutes_validation_message.value?.focus()
}

export const file = ref<File | undefined>(undefined)

export const userInfo = ref<any | undefined>(undefined)

export const average_macros_this_week = ref<Average_macros_this_week | undefined>(undefined)

export const meals = ref<Meal_with_ingredients[] | undefined>(undefined)

export const ingredients = ref<Ingredients | undefined>(undefined)

const date = new Date()
export const calender_date = ref<string>(
  `${check_if_number_is_less_than_10(date.getMonth() + 1)}-${check_if_number_is_less_than_10(date.getDate())}-${date.getFullYear()}`
)
export const zero_meals_to_show = ref<boolean>(true)

export const meals_for_given_date = ref<Meals_for_time_of_day | undefined>(undefined)

export async function initData(user_id: string) {
  userInfo.value = await getData(`/user_info/${user_id}`)

  meals_for_given_date.value = await get_meals_for_given_date()

  console.log(meals.value)
}

// https://www.zhenghao.io/posts/verify-image-url
function canFindImage(url: string) {
  const img = new Image()
  img.src = url
  return new Promise((resolve) => {
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
  })
}

export const profile_alert = ref<HTMLElement | null>(null)
export const profilePictureUrl = ref<string>(user_icon)

export async function initPicture() {
  const imageUrl = localStorage.getItem('imageUrl')

  const user_id = localStorage.getItem('user_id')

  if (!user_id) return routeToPage('macroLogin')

  if (imageUrl && (await canFindImage(imageUrl))) {
    console.log('Getting image from storage')
    profilePictureUrl.value = imageUrl
  } else {
    const response = await fetchResource(
      'GET',
      '',
      `/user_picture/${user_id}`,
      profile_alert.value,
      'token'
    )

    if (response && response.ok && response.headers.get('Content-Type') == 'image/png') {
      const blob = await response.blob()
      const userPictureURL = URL.createObjectURL(blob)

      localStorage.setItem('imageUrl', userPictureURL)

      console.log(userPictureURL)
      if (userPictureURL) profilePictureUrl.value = userPictureURL ? userPictureURL : user_icon
    }
  }
}
