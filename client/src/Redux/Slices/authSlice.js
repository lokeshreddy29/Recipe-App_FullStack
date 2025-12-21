import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userDets: "",
    authDone: false,
  },
  reducers: {
    addUserDetailsToRedux: (state, action) => {
      state.userDets = action.payload
      state.authDone = true
    },
    clearAccessInRedux: (state) => {
      state.userDets = ""
      state.authDone = false
    },
  },
})

export const { addUserDetailsToRedux, clearAccessInRedux } = authSlice.actions

export default authSlice.reducer