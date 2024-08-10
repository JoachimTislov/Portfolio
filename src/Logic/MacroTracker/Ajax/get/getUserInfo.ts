import { recommended_nutrient_data, userInfo } from '../../initVariables'
import type { UserInfo } from '../../types'
import { getData } from '../ajax'

const activity_Levels = [
  'Sedentary',
  'Lightly Active',
  'Moderately Active',
  'Very Active',
  'Super Active'
]

const genders = ['Male', 'Female']

export async function getUserInfo() {
  console.log('Getting userInfo')

  const user_id = localStorage.getItem('user_id')
  const userInfo_response = await getData(`/user_info/${user_id}`)

  if (userInfo_response && userInfo_response.ok) {
    const user_info = (await userInfo_response.json()) as UserInfo

    console.log(user_info)
    // Mapping correct values
    user_info['Activity lvl'] = activity_Levels[parseInt(user_info['Activity lvl']) - 1]
    user_info['Gender'] = genders[parseInt(user_info['Gender']) - 1]

    userInfo.value = user_info
  }
}
