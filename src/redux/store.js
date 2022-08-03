import { configureStore } from "@reduxjs/toolkit";
import playlistsReducer from "./playlistsSlice";

export const store = configureStore({
  reducer: {
    playlists: playlistsReducer,
  },
});
