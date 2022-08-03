import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";
const initialState = {
  list: [],
};

export const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    load: (state) => {
      // for (let index = 0; index < 2000000000; index++) {}
      state.list = data.list;
    },
  },
});

export const { load } = playlistsSlice.actions;

export default playlistsSlice.reducer;
