import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoCollagePlaylist from "../VideoCollagePlaylist";

const PlayList = ({ state }) => {
  const { id } = useParams();
  const [playListData, setPlayListData] = useState();
  useEffect(() => {
    if (state && state.length > 0) {
      const data = state.find((item) => {
        console.log(item, id);
        return item.id === id;
      });
      if (!data) {
        //TODO: no such...
      } else {
        setPlayListData([...data.list]);
      }
      //
    }
  }, [state]);
  console.log(id, state);
  return (
    <>{playListData && <VideoCollagePlaylist playListData={playListData} />}</>
  );
};

export default PlayList;
