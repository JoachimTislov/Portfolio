import { initPicture, profile_alert } from '../initVariables'
import { fetchResource } from './ajax'

export async function uploadProfilePicture(file: Blob | undefined) {
  console.log('Uploading picture', file)
  if (!file) {
    console.log('File does not exist')
    if (profile_alert.value) {
      profile_alert.value.innerHTML = 'No file selected'
      profile_alert.value.className = 'alert alert-danger'
    }
    //alertUserWithMessage('user_alert', "No file selected", "red")
    return
  } else {
    try {
      const form_data = new FormData()
      form_data.append('file', file)

      for (const key of form_data.entries()) {
        console.log(key[0], ', ', key[1])
      }

      const response = await fetchResource(
        'POST',
        form_data,
        '/profile_picture',
        profile_alert.value,
        'token'
      )

      if (response) {
        if (response.status != 200) {
          console.log('Error when uploading picture.')
          //this.$root.alertUserWithMessage('user_alert', this.$root.cookie['Message'], "red")
          return false
        }

        if (response.ok) {
          console.log('Uploaded picture')

          // Resetting the input, prevents spam
          const fileInput = document.getElementById('pictureInput') as HTMLInputElement
          fileInput.value = ''

          initPicture()
          //this.$root.alertUserWithMessage('user_alert', this.$root.cookie['Message'], "green")
        }
      }
    } catch (error) {
      console.error('Error when uploading profile picture: ', error)
    }
  }
}
