import { userInfo } from '../../initVariables'
import { getData } from '../ajax'

export async function getUserInfo() {
  const user_id = localStorage.getItem('user_id')
  const userInfo_response = await getData(`/user_info/${user_id}`)
  userInfo.value = userInfo_response ? await userInfo_response.json() : undefined
}
