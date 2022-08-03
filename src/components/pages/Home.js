import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const Home = () => {
  const playlists = useSelector((state) => {
    return state.playlists.list;
  });

  return (
    <>
      {playlists &&
        playlists.map((item) => {
          return (
            <div key={item.id}>
              <Link to={`/playlist/${item.id}`}>{item.id}</Link>
            </div>
          );
        })}
    </>
  );
};

export default Home;
