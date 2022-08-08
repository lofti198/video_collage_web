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
    removePlaylist: (state, action) => {
      console.log("remove", action);
      state.list = state.list.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { load, removePlaylist } = playlistsSlice.actions;

export default playlistsSlice.reducer;
