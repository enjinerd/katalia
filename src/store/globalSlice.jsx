import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    data: {
      username: '',
      upCount: [''],
      theme: 'light',
    },
  },
  reducers: {
    setUsername: (state, action) => {
      state.data.username = action.payload;
    },
    setTheme: (state, action) => {
      state.data.theme = action.payload;
    },
    setUpcount: (state, action) => {
      state.data.upCount.push(action.payload);
    },
    deleteUpcount: (state, action) => {
      state.data.upCount = state.data.upCount.filter(
        (e) => e !== action.payload
      );
    },
  },
});

export const { setUsername, setTheme, setUpcount, deleteUpcount } =
  globalSlice.actions;
export default globalSlice.reducer;
