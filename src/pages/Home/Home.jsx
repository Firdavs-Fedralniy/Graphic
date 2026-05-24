import React from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import orderly from "../../assets/order.png"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useNotificationChecker } from '../../App/hooks/useNotificationsChecker'

function Home() {
   
  const theme = useSelector((state) => state.themeSlice.theme)
  const navigate = useNavigate()
  return (
    <>
    <Header/>
    <main>
      <section className={`create ${theme ? "create__black" : ""}`}>
        <div className="container">
            <div className="create__wrapper">
              <div className="create__info">
                <h2 className="create__title">Let's make your day orderly</h2>
                <p className="create__text">Plan smarter, stress less. Orderly Day helps you organize your tasks, set priorities, and stay focused on what truly matters.</p>
                <button className="create__button" onClick={()=>navigate("/createGraphic")}>Create graphic</button>
              </div>
              <img src={orderly} alt="" className="create__img" />
            </div>
        </div>
      </section>
    </main>
    </>
  )
}

export default Home
