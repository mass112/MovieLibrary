import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userId: null,
  token: null,
  username: null,
  name: null,
  login: null,
  logout: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setIsDark(state, action) {
      state.isDark = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setUID(state, action) {
      state.userId = action.payload;
    },
    setLogin(state, action) {
      state.login = action.payload;
    },
    setLogout(state, action) {
      state.logout = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
