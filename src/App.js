import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import PlayListPage from "./components/pages/PlayListPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";
import { load } from "./redux/playlistsSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load());
  }, []);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="playlist/:id" element={<PlayListPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
