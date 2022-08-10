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
      console.log(
        "before long operation in load reducer",
        new Date().getTime() / 1000
      );
      // for heavy tasks pls create async methods and use redux thunk
      // for (let index = 0; index < 2000000000; index++) { }
      console.log(
        "after long operation in load reducer",
        new Date().getTime() / 1000
      );
      return {
        ...state,
        list: data.list
      }
    },
    removePlaylist: (state, action) => {
      console.log("remove", action);
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.payload.id)
      }
    },
  },
});

export const { load, removePlaylist } = playlistsSlice.actions;

export default playlistsSlice.reducer;
