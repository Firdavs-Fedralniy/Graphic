import React from 'react'
import "./Switch.css"
import { useDispatch, useSelector } from 'react-redux'
import { toogleTheme } from '../../features/themeSlice'

function Switch() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.themeSlice.theme) 

  const handleTheme = () => {
    dispatch(toogleTheme())
  }

  return (
    <div className={theme ? "switch__theme__dark" : "switch__theme"} onClick={handleTheme}>
      <div className={`switch__thumb ${theme ? "dark" : ""}`}>
        {theme 
          ? <i className="bi bi-moon-fill"></i> 
          : <i className="bi bi-sun-fill"></i>
        }
      </div>
    </div>
  )
}

export default Switch