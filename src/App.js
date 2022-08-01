import logo from "./logo.svg";
import "./App.css";
import VideoCollagePlaylist from "./components/VideoCollagePlaylist";
import YoutubeErrorOnStart from "./components/YoutubeErrorOnStart";
import Home from "./components/pages/Home";
import PlayList from "./components/pages/PlayList";
import NotFound from "./components/pages/NotFound";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <div className="App">
        <h1>Welcome to React Router!</h1>
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
