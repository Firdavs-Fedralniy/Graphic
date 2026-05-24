import { useEffect } from 'react'
import { useGetGraphicQuery } from '../../services/graphicsApi'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '../../features/notificationsSlice'

const TG_TOKEN = import.meta.env.VITE_TG_BOT_TOKEN
const TG_CHAT_ID = import.meta.env.VITE_TG_CHAT_ID

async function sendTelegramMessage(text) {
  await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TG_CHAT_ID,
      text: text,
      parse_mode: 'HTML'
    })
  })
}

export function useNotificationChecker() {
  const token = useSelector((state) => state.auth.token)
  const { data: graphics } = useGetGraphicQuery(undefined, {
    skip: !token
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token) return

    const check = () => {
      const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tashkent' })
      const nowDate = new Date(now)
      const currentDate = nowDate.toLocaleDateString('en-CA')
      const currentTime = nowDate.toTimeString().slice(0, 5)

      graphics?.forEach((item) => {
        if (
          item.date === currentDate &&
          item.time?.slice(0, 5) === currentTime &&
          !item.done
        ) {
          dispatch(addNotification(item))

          // отправляем в Telegram
          sendTelegramMessage(
            `🔔 <b>Orderly Day</b>\n\n📌 <b>${item.title}</b>\n📝 ${item.text}\n🕐 ${item.time?.slice(0, 5)}`
          )
        }
      })
    }

    check()
    const interval = setInterval(check, 60000)
    return () => clearInterval(interval)
  }, [graphics, token])
}