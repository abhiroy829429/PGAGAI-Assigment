import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type UserState = {
  isAuthenticated: boolean
  user: {
    id: string
    name: string
    email: string
    role: string
  } | null
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState["user"]>) => {
      state.isAuthenticated = true
      state.user = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
