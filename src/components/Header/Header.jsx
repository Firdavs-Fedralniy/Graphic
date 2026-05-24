import React from 'react'
import "./Header.css"
import Switch from '../Switch/Switch'
import logo from "../../assets/graphic.png"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
    const navigate = useNavigate()
    const theme = useSelector((state) => state.themeSlice.theme)
    const token = useSelector((state) => state.auth.token)

  return (
    <header className={`header ${theme? "header__black" : ""}`}>
        <div className="container">
            <div className="header__wrapper">
                <img src={logo} alt="pon" className="header__img" />
                <ul className="header__menu">
                    <li className="header__list"><a  className={theme? "header__link__black" : "header__link"} onClick={()=> navigate("/home")}>Home</a></li>
                    <li className="header__list"><a  className={theme? "header__link__black" : "header__link"} onClick={()=> navigate("/myGraphic")}>My Graphics</a></li>
                    <li className="header__list"><a  className={theme? "header__link__black" : "header__link"} onClick={()=> navigate("/createGraphic")}>Create graphic</a></li>
                    <li className="header__list"><a  className={theme? "header__link__black" : "header__link"}>About us</a></li>
                </ul>
                <div className="header__UI">
                    <Switch/>
                    {token ? <>
                    <i className={`bi bi-person-circle ${theme ? "bi-black" : ""}`}></i>
                    <i className={`bi bi-bell-fill ${theme ? "bi-black" : ""}`} onClick={()=> navigate("/notifications")}></i>
                   <a href="https://t.me/graphicday123_bot"> <i class="bi bi-send-fill" ></i></a>
                    </>: <>
                    <button className={`header__login ${theme? "header__login__black" : ""}`} onClick={()=> navigate("/login")}>Log In</button>
                    <button className={`header__signin ${theme? "header__signin__black" : ""}`}>Sign In</button>
                    </>}
                </div>
            </div>
        </div>
                    <div className={`header__line ${theme ? "header__line__black" : ""}`}></div>
    </header>
  )
}

export default Header
