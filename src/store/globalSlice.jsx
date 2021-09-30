import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    data: {
      username: '',
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
  },
});

export const { setUsername, setTheme } = globalSlice.actions;
export default globalSlice.reducer;
