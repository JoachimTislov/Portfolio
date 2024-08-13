import { reactive, ref, watch, type Ref } from 'vue'
import {
  type Calender_data,
  type Ingredients,
  type Meal_with_ingredients,
  type Meals_for_time_of_day,
  type Stats_for_dates,
  type UserInfo,
  type Validation_array,
  type validation_Object
} from './types'
import { alertUser, getData } from './Ajax/ajax'
import user_icon from '@/assets/Icons/user-icon.png'
import { routeToPage } from './routeToPage'
import {
  getDayOfTheWeek_Monday_to_Sunday,
  getTodaysDate_FriendlyFormatDateInput
} from './dateSystem'

export const fetchingResource = ref<boolean>(false)

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

const storedUsername = localStorage.getItem('username')
export const username = ref<string>(storedUsername ? storedUsername : '')
export const password = ref<string>('')

export const change_password_validation: Validation_array = reactive({
  old_password: false,
  new_password: false,
  new_confirm_password: false
})

export const login_validation = reactive({
  Username: true,
  Password: true
})

export const user_validation_arr: { [key: string]: boolean } = reactive({
  username: false,
  password: false,
  confirm_password: false,
  gender: false,
  activityLvl: false,
  email: false,
  weight: false,
  height: false,
  age: false,
  name: false
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
    gender: ref<HTMLElement | null>(null),
    activity_lvl: ref<HTMLElement | null>(null)
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

export const days_of_the_week_with_date = ref<{ Day: string; Date: string }[]>([
  { Day: 'Monday', Date: '' },
  { Day: 'Tuesday', Date: '' },
  { Day: 'Wednesday', Date: '' },
  { Day: 'Thursday', Date: '' },
  { Day: 'Friday', Date: '' },
  { Day: 'Saturday', Date: '' },
  { Day: 'Sunday', Date: '' }
])

export const days_of_the_week_index = ref<number>(getDayOfTheWeek_Monday_to_Sunday())
export const day_for_chosenDate = ref<string>(
  days_of_the_week_with_date.value[days_of_the_week_index.value].Day
)

export const zero_meals_for_time_period = ref<boolean>(false)

export const selected_start_date = ref<string>(getTodaysDate_FriendlyFormatDateInput())
export const selected_end_date = ref<string>(getTodaysDate_FriendlyFormatDateInput())

export const selectedDate = ref<string>(getTodaysDate_FriendlyFormatDateInput())

export const meals_for_time_of_day = ref<Meals_for_time_of_day | {}>({})
export const dates_within_selected_period = ref<string[]>([])

// Used in statistics
export const StatsToShow = ref<boolean>(false)

export const labels = ['Calories', 'Protein', 'Carbohydrates', 'Fat', 'Sugar']
export const overall_stats = reactive({
  total: [0, 0, 0, 0, 0],
  average: [0, 0, 0, 0, 0]
})

export const stats_for_dates: Stats_for_dates = reactive({})

export const eaten_nutrient_progression: { [key: string]: number[] } = reactive({
  calories: [0],
  protein: [0],
  carbohydrates: [0],
  fat: [0],
  sugar: [0]
})

////////////////////////////////////////

export const recommended_nutrient_data: number[] = reactive([])
export const userInfo = ref<UserInfo | undefined>(undefined)

export const calender_data = ref<Calender_data>({})
export const meals = ref<Meal_with_ingredients[] | undefined>(undefined)
export const ingredients = ref<Ingredients | undefined>(undefined)

/////////////////////////////////////////////////

//////////////////////// Image find picture ////////////////////////////////////////

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

////////////////////////////////////////////////////////////////
