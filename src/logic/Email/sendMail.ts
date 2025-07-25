import emailjs from 'emailjs-com'

export async function sendMail(text: string, board?: string, log?: string) {
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      { Text: text, Board: board, Log: log },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
  } catch (error) {
    console.error('Error when sending mail:', error)
  }
}
