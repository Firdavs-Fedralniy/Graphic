import React from 'react'
import "./MyGraphic.css"
import { useDeleteGraphicMutation, useGetGraphicQuery } from '../../services/graphicsApi'
import Header from '../../components/Header/Header'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function MyGraphic() {
    const token = useSelector((state) => state.auth.token)
    console.log("token:", token)
  const { data: graphics, isLoading } = useGetGraphicQuery(undefined, {
  skip: !token  // ← не делать запрос если нет токена
})
  const theme = useSelector((state) => state.themeSlice.theme)
  const navigate = useNavigate()
  const [deletew,{isLoading:isDeleting}] = useDeleteGraphicMutation() 


  const grouped = graphics?.reduce((acc, item) => {
    const date = item.date
    if (!acc[date]) acc[date] = []
    acc[date].push(item)
    return acc
  }, {})

  const sortedDates = grouped
    ? Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b))
    : []

  function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Tashkent'
    })
  }


 async function hundleDelete(e){
    try{
            await deletew(e).unwrap()
    }catch(err){
        console.log(err);
        
    }
  }

  return (
    <div className={`mg ${theme ? 'mg--dark' : ''}`}>
      <Header />

      <div className="mg__container">
        <div className="mg__top">
          <h1 className="mg__title">My Graphics</h1>
          <button className="mg__btn__create" onClick={() => navigate('/createGraphic')}>
            + New
          </button>
        </div>

        {isLoading && <p className="mg__loading">Loading...</p>}

        <div className="mg__list">
          {sortedDates.map((date, index) => (
            <div key={date} className="mg__item">

              <div className="mg__timeline">
                <div className="mg__circle">{index + 1}</div>
                {index < sortedDates.length - 1 && <div className="mg__line"></div>}
              </div>

              <div className="mg__card">
                <div className="mg__card__date__header">
                  <span className="mg__card__date__label">{formatDate(date)}</span>
                  <span className="mg__card__count">
                    {grouped[date].length} {grouped[date].length === 1 ? 'task' : 'tasks'}
                  </span>
                </div>

                <div className="mg__tasks">
                  {grouped[date]
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((task) => (
                   <div key={task.id} className="mg__task">
  <div className="mg__task__time">{task.time?.slice(0, 5)}</div>
  <div className="mg__task__body">
    <p className="mg__task__title">{task.title}</p>
    <p className="mg__task__text">{task.text}</p>
  </div>
  <button className="mg__task__delete" onClick={() => hundleDelete(task.id)}>✕</button>
</div>
                      
                    ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyGraphic