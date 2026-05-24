import React from 'react'
import "./Notifications.css"
import Header from '../../components/Header/Header'
import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../../features/notificationsSlice'
import { useDeleteGraphicMutation } from '../../services/graphicsApi'

function Notifications() {
  const theme = useSelector((state) => state.themeSlice.theme)
  const notifications = useSelector((state) => state.notifications.items)
  const dispatch = useDispatch()
  const [deletee] = useDeleteGraphicMutation()


  console.log("notifications:", notifications)

  async function handleDone(id) {
    try {
      await deletee(id).unwrap()
      dispatch(removeNotification(id))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={`notif ${theme ? 'notif--dark' : ''}`}>
      <Header />
      <div className="notif__container">
        <h1 className="notif__title">Notifications</h1>

        {notifications.length === 0 && (
          <p className="notif__empty">No notifications yet</p>
        )}

        <div className="notif__list">
          {notifications.map((item) => (
            <div key={item.id} className="notif__card">
              <div className="notif__card__info">
                <div className="notif__card__top">
                  <h3 className="notif__card__title">{item.title}</h3>
                  <div className="notif__card__time">
                    <span>{item.date}</span>
                    <span>{item.time?.slice(0, 5)}</span>
                  </div>
                </div>
                <p className="notif__card__text">{item.text}</p>
              </div>
              <button className="notif__btn__done" onClick={() => handleDone(item.id)}>
                Done ✓
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notifications