import { profile_alert, profilePictureUrl } from '../initVariables'
import { fetchResource } from './ajax'
import user_icon from '@/assets/Icons/user-icon.png'

export async function deleteProfilePicture() {
  try {
    const response = await fetchResource('DELETE', '', '/profile_picture', 'token')

    if (response) {
      if (!response.ok) {
        console.log('Error when deleting picture.')
        //this.$root.alertUserWithMessage('user_alert', this.$root.cookie['Message'], "red");
        return false
      }

      if (response.ok) {
        profilePictureUrl.value = user_icon
        localStorage.removeItem('imageUrl')
        console.log('Deleted picture.')
        //this.$root.load_user_info();
        //this.$root.alertUserWithMessage('user_alert', /* message */, "green");
        //file = null;
      }
    }
  } catch (error) {
    console.error('Error deleting profile picture:', error)
  }
}
