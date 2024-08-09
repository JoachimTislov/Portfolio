import { userInfo } from '../../initVariables'
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
  const user_id = localStorage.getItem('user_id')
  const userInfo_response = await getData(`/user_info/${user_id}`)

  if (userInfo_response) {
    const user_info = (await userInfo_response.json()) as UserInfo

    // Mapping correct values
    user_info['Activity lvl'] = activity_Levels[parseInt(user_info['Activity lvl'])]
    user_info['Gender'] = genders[parseInt(user_info['Gender'])]

    userInfo.value = user_info
  }
}
