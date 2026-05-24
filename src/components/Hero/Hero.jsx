import React, { useRef, useEffect } from 'react'
import "./Hero.css"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Hero() {
  const vantaRef = useRef(null)
  const vantaEffect = useRef(null)
  const theme = useSelector((state) => state.themeSlice.theme)
  const navigate = useNavigate()

useEffect(() => {
  if (vantaEffect.current) {
    vantaEffect.current.destroy() 
    vantaEffect.current = null
  }

  if (window.VANTA) {
    vantaEffect.current = window.VANTA.FOG({
      el: vantaRef.current,
      highlightColor: theme ? 0x0 : 0xffe3, 
      midtoneColor: theme ? 0xffffff : 0xf2f2f2,
      lowlightColor: theme ? 0xffffff : 0xe1ff,
      baseColor: theme ? 0x0 : 0xffffff,
      zoom: 1.4,
      speed: 1,
      blurFactor: 0.6,
    })
  }

  return () => {
    if (vantaEffect.current) {
      vantaEffect.current.destroy()
      vantaEffect.current = null
    }
  }
}, [theme])

  return (
    <section className="hero" ref={vantaRef}>
      <div className="container">
        <div className="hero__wrapper">
          <div className="hero__info">
            <h2 className={theme ? "hero__title__black" : "hero__title"}>Make your day more <br /> orderly</h2>
            <p className="hero__text">Login to get more content</p>
           <div className="hero__button__wrapp">
             <button className={`hero__login ${theme ? "hero__login__black" : ""}`} onClick={(navigate("/login"))}>Log In</button>
            <button className={`hero__signin ${theme ? "hero__signin__black" : ""}`} onClick={()=> navigate("/signin")}>Sign In</button>
           </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero