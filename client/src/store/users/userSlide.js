import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncAction'

export const userSlide = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    isLoading: false
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout:(state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },

    extraReducers: (builder) => {
      
      builder.addCase(actions.getCurrent.pending, (state) => {
        state.isLoading = true;
      });

      builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.current = action.payload;
        // console.log(state.current);
      });

      builder.addCase(actions.getCurrent.rejected, (state, action) => {
        state.isLoading = false;
        state.current = null;
      });
    },
});

export const { login, logout } = userSlide.actions;

export default userSlide.reducer;
