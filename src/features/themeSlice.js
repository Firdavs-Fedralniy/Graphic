import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    theme: localStorage.getItem("theme") === "dark" 
}

const themeSlice = createSlice({
    name: "themeSlice",
    initialState,
    reducers: {
        toogleTheme: (state) => {
            state.theme = !state.theme
            localStorage.setItem("theme", state.theme ? "dark" : "light")
        }
    }
})

export const { toogleTheme } = themeSlice.actions
export default themeSlice.reducer