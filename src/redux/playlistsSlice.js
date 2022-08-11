import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "../data";

const initialState = {
  list: [],
  loading: false,
};

export const load = createAsyncThunk(
  'playList/getPlayList',
  async () => new Promise(resolve => setTimeout(() => resolve(data.list), 1000)).then(data => data)
);
export const removePlaylist = createAsyncThunk(
  'playList/removeFromPlayList',
  async ({ id }) => new Promise(resolve => resolve(id)).then((id) => id)
);

export const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  extraReducers: {
    [load.pending]: (state) => {
      return {
        ...state,
        loading: true
      }
    },
    [load.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        list: payload
      }
    },
    [load.rejected]: (state) => {
      return {
        ...state,
        loading: false
      }
    },
    [removePlaylist.pending]: (state, _) => {
      return { ...state }
    },
    [removePlaylist.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        list: state.list.filter(item => item.id !== payload)
      }
    },
    [removePlaylist.rejected]: (state, _) => {
      return { ...state }
    },
  },
});

export default playlistsSlice.reducer;