import emailjs from 'emailjs-com'

export async function sendMail(text: string, template_Id: string, board?: string, log?: string) {
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      template_Id,
      { Text: text, Board: board, Log: log },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
  } catch (error) {
    console.error('Error when sending mail:', error)
  }
}
