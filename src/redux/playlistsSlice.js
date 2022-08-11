import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "../data";
const initialState = {
  loading: false,
  error: "",
  list: [],
};

export const load = createAsyncThunk("app/load", async (params, thunkAPI) => {
  console.log(
    "before long operation in load reducer",
    new Date().getTime() / 1000
  );
  for (let index = 0; index < 2000000000; index++) {}
  console.log(
    "after long operation in load reducer",
    new Date().getTime() / 1000
  );
  return { ...initialState, list: data.list };
});
export const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    // load: (state) => {

    // },
    removePlaylist: (state, action) => {
      console.log("remove", action);
      state.list = state.list.filter((item) => item.id !== action.payload.id);
    },
  },

  extraReducers: {
    [load.pending]: (state) => {
      console.log("pending");
      state.loading = true;
    },
    [load.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [load.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("fulfilled", action);
      action.payload.list = action.payload.list;
      // if (state.data.length < 1) {
      //     state.data = action.payload;
      // } else {
      //     state.data.items.push(...action.payload.channel.items);
      // }
    },
  },
});

export const { removePlaylist } = playlistsSlice.actions;

export default playlistsSlice.reducer;
