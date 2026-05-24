import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    items: []
  },
  reducers: {
    addNotification: (state, action) => {
      const exists = state.items.find((i) => i.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
      }
    },
    removeNotification: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload)
    }
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer