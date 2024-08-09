import { reactive, ref, watch, type Ref } from 'vue'
import type {
  Average_macros_this_week,
  Ingredients,
  Meal_with_ingredients,
  Meals_for_time_of_day,
  UserInfo,
  Validation_array,
  validation_Object
} from './types'
import { alertUser, getData } from './Ajax/ajax'
import { check_if_number_is_less_than_10 } from './checkLogic/check_if_number_is_less_than_10'
import user_icon from '@/assets/Icons/user-icon.png'
import { routeToPage } from './routeToPage'
import { days_of_the_week } from '@/Data/MacroTracker'

export const ingredient_validation = {
  name: false,
  amount: false,
  protein: true,
  calories: true,
  carbohydrates: true,
  fat: true,
  sugar: true
}

export const createOrEditIngredient = ref<string>('Create')
export const createOrEdit_ingredient_validation_arr: Validation_array =
  reactive(ingredient_validation)

watch(
  () => createOrEditIngredient.value,
  (newValue) => {
    const value = newValue !== 'Create'

    createOrEdit_ingredient_validation_arr.isNameValid = value
    createOrEdit_ingredient_validation_arr.isAmountValid = value
  }
)

export const createOrEditMeal = ref<string>('Create')
export const meal_name_validation = ref<boolean>(false)
export const meal_validation = ref<validation_Object[]>([])

watch(
  () => createOrEditMeal.value,
  (newValue) => {
    const value = newValue !== 'Create'
    meal_name_validation.value = value
  }
)

export const showAlert = ref<boolean>(false)
export const alertMessage = ref<string>('')
export const alertClassName = ref<string>('')

export const days_of_the_week_index = ref<number>(new Date().getDay())
export const day_for_chosenDate = ref<string>(days_of_the_week.value[days_of_the_week_index.value])

const storedUsername = localStorage.getItem('username')
export const username = ref<string>(storedUsername ? storedUsername : 'Peddi')
export const password = ref<string>('peder@123')

export const change_password_validation: Validation_array = reactive({
  old_password: false,
  new_password: false,
  new_confirm_password: false
})

export const login_validation = reactive({
  Username: true,
  Password: true
})

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
  }
}

export function initAlertElements() {
  for (const category of Object.keys(validation_messages)) {
    for (const element of Object.keys(validation_messages[category])) {
      validation_messages[category][element].value?.focus()
    }
  }
}

//////////////// Data init //////////////////////

export const userInfo = ref<UserInfo | undefined>(undefined)

export const average_macros_this_week = ref<Average_macros_this_week | undefined>(undefined)

export const meals = ref<Meal_with_ingredients[] | undefined>(undefined)

export const ingredients = ref<Ingredients | undefined>(undefined)

const date = new Date()
export const calender_date = ref<string>(
  `${check_if_number_is_less_than_10(date.getDate())}-${check_if_number_is_less_than_10(date.getMonth() + 1)}-${date.getFullYear()}`
)
export const zero_meals_to_show = ref<boolean>(true)
export const meals_for_given_date = ref<Meals_for_time_of_day | undefined>(undefined)

/////////////////////////////////////////////////

// https://www.zhenghao.io/posts/verify-image-url
function canFindImage(url: string) {
  const img = new Image()
  img.src = url
  return new Promise((resolve) => {
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
  })
}

export const _file = ref<File | null>(null)
export const profilePictureUrl = ref<string>(user_icon)
export const uploadedPicture = ref<boolean>(false)

export async function initPicture() {
  const imageUrl = localStorage.getItem('imageUrl')
  const user_id = localStorage.getItem('user_id')

  if (!user_id) return routeToPage('macroLogin')

  if (imageUrl && (await canFindImage(imageUrl))) {
    profilePictureUrl.value = imageUrl
    uploadedPicture.value = true
  } else {
    console.log('Getting image')

    const response = await getData(`/user_picture/${user_id}`)

    if (response && response.ok) {
      if (response.headers.get('Content-Type') == 'image/png') {
        const blob = await response.blob()
        const userPictureURL = URL.createObjectURL(blob)

        localStorage.setItem('imageUrl', userPictureURL)
        profilePictureUrl.value = userPictureURL
        uploadedPicture.value = true
      } else {
        const result = await response.json()
        alertUser(result.message, response)
      }
    }
  }
}
