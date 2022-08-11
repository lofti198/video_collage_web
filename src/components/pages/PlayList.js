import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoCollagePlaylist from "../VideoCollagePlaylist";

import { useSelector } from "react-redux";

const PlayList = () => {
  const playlists = useSelector((state) => {
    return state.playlists.list;
  });

  const { id } = useParams();
  const [playListData, setPlayListData] = useState();
  useEffect(() => {
    if (playlists && playlists.length > 0) {
      const data = playlists.find((item) => {
        return item.id === id;
      });
      if (!data) {
        //TODO: no such...
      } else {
        setPlayListData([...data.list]);
      }
      //
    }
  }, [playlists]);

  return (
    <>
      {" "}
      <div style={{ margin: "auto" }}>
        {playListData && <VideoCollagePlaylist playListData={playListData} />}
      </div>
    </>
  );
};

export default PlayList;
