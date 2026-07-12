import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genderId: 1,
  gender: "male",
  initialized: false, 
};

const genderSlice = createSlice({
  name: "gender",
  initialState,
  reducers: {
    setGender: (state, action) => {
      state.genderId = action.payload.genderId;
      state.gender = action.payload.gender;
      state.initialized = true;
    },
  },
});

export const { setGender } = genderSlice.actions;
export default genderSlice.reducer;