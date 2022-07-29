import React, { useState } from "react";
import YouTube from "react-youtube";

const VideoCollagePlaylist = () => {
  const [player, setPlayer] = useState(null);
  const [videoId, setVideoId] = useState(() => {
    return demoPlaylist[0].id;
  });
  const opts = {
    //  height: '390',
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters

      autoplay: 1,
      // https://github.com/tjallingt/react-youtube/issues/327
      mute: 0,
    },
  };

  const _onReady = (event) => {
    setPlayer(event.target);
    // console.log("_onReady")
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    //console.log("pauseVideo sent")
  };

  return (
    <>
      <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
    </>
  );
};

export default VideoCollagePlaylist;

const demoPlaylist = [
  { id: "VcT8puLpNKA", start: 155, end: 167 },
  { id: "VcT8puLpNKA", start: 15, end: 17 },
];

/*
player.seekTo(e.target.getAttribute("timesecond"));
    player.playVideo(); */
