import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  token: localStorage.getItem('token') || null,
  userId: localStorage.getItem('userId') || null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
      setCredentials: (state, action) => {
  state.token = action.payload.token
  state.userId = action.payload.userId
  localStorage.setItem('token', action.payload.token)
  localStorage.setItem('userId', action.payload.userId)
    },
    logout: (state) => {
  state.token = null
  state.userId = null
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
    }
  }
})

export const {  setCredentials,logout} = authSlice.actions
export default authSlice.reducer