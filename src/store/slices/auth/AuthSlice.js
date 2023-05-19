import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {

  const authLocalStorage = localStorage.getItem("auth");

  if (authLocalStorage) {
    return JSON.parse(authLocalStorage);
  }

  return {
    id: null,
    correo: null,
    token: null,
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.id = action.payload.id;
      state.correo = action.payload.correo;
      state.token = action.payload.token;
      localStorage.setItem("auth", JSON.stringify(action.payload));
    },
    logout(state, action) {
      state.id = null;
      state.correo = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;