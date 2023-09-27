import { createSlice } from "@reduxjs/toolkit";

const storedUserData: any = localStorage.getItem("user");
const userData = JSON.parse(storedUserData);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: userData || null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserData }: any = userSlice.actions;

export default userSlice.reducer;
