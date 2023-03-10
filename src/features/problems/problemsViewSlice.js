import { createSlice } from "@reduxjs/toolkit";

export const problemsViewSlice = createSlice({
  name: "problemsView",
  initialState: {
    operations: ["+"],
  },
  reducers: {
    setOperation: (state, action) => {
      state.operations = action.payload;
    },
  },
});
