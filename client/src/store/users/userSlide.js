import { createSlice } from "@reduxjs/toolkit";

export const userSlide = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
  },
  reducers: {
    register: (state, action) => {
        console.log(action)
      state.isLoggedIn = action.payload.isLoggedIn;
      state.current = action.payload.userData;
      state.token = action.payload.token;
    },
  },

  //   extraReducers: (builder) => {
  //     builder.addCase(getNewProducts.pending, (state) => {
  //       state.isLoading = true;
  //     });

  //     builder.addCase(getNewProducts.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.newProducts = action.payload;
  //     //   console.log(action.payload);
  //     });

  //     builder.addCase(getNewProducts.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.errorMessage = action.payload;
  //     });
  //   },
});

export const { register } = userSlide.actions;

export default userSlide.reducer;
