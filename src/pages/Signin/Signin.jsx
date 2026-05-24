import React, { useState } from 'react'
import "./Signin.css"
import Switch from '../../components/Switch/Switch'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {useLogInMutation, useRegisterMutation } from '../../services/authApi'
import { setCredentials } from '../../features/authSlice'

function Signin() {
  const theme = useSelector((state) => state.themeSlice.theme)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState(false)
  const [register, { isLoading }] = useRegisterMutation()
  const [login, { isLoading: isLogininig}] = useLogInMutation()

  async function hundleSubmit(e) {
    e.preventDefault()
    setError(false)
    try {
      const res = await register(formData).unwrap()
    
     if(res){
      const log = await login(formData).unwrap()
        dispatch(setCredentials({ token: res.access_token, userId: res.user.id }))
        if(log){
          navigate("/home")
        }else{
          console.log("Credentails error");
          
        }
     }
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }

  function hundleChange(e) {
    const { name, value } = e.target
    setFormData((state) => ({ ...state, [name]: value }))
    if (error) setError(false)
  }

  return (
    <div className={`login ${theme ? "login--dark" : ""}`}>
      <div className="login__switch">
        <Switch />
      </div>

      <div className="login__box">
        <div className="login__logo">
          <span className="login__logo__dot"></span>
          <span className="login__logo__name">Orderly day</span>
        </div>

        <h2 className="login__title">Welcome dear User</h2>
        <p className="login__subtitle">Sign in to continue</p>

        <form className="login__form" onSubmit={hundleSubmit}>
          <div className="login__field">
            <label className="login__label">Email</label>
            <input
              type="email"
              className={`login__email ${error ? "login__input--error" : ""}`}
              placeholder="you@example.com"
              onChange={hundleChange}
              name="email"
            />
          </div>

          <div className="login__field">
            <label className="login__label">Password</label>
            <input
              type="password"
              className={`login__password ${error ? "login__input--error" : ""}`}
              placeholder="Enter password"
              onChange={hundleChange}
              name="password"
            />
          </div>

          {error && (
            <p className="login__error">Invalid email or password</p>
          )}

          <button type="submit"cla >{isLoading ? "Sending..." : "Send"}</button>
        </form>

        <p className="login__check">
          Already have an account? <span onClick={() => navigate("/login")}>Log in</span>
        </p>
      </div>
    </div>
  )
}

export default Signin