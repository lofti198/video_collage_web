import logo from "./logo.svg";
import "./App.css";
import Home from "./components/pages/Home";
import PlayList from "./components/pages/PlayList";
import NotFound from "./components/pages/NotFound";
import { Routes, Route } from "react-router-dom";
import { load } from "./redux/playlistsSlice";

import { useDispatch } from "react-redux";

const loadPlaylistsAsync = () => {
  return async (dispatch) => {
    dispatch(load());
  };
};

function App() {
  const dispatch = useDispatch();
  dispatch(loadPlaylistsAsync());

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="playlist/:id" element={<PlayList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
