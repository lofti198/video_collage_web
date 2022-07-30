import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

const YoutubeErrorOnStart = () => {
  const [player, setPlayer] = useState(null);

  const [videoId, setVideoId] = useState("VcT8puLpNKA");

  const opts = {
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: 0,
    },
  };

  useEffect(() => {
    if (player) player.playVideo();
  }, [player]);

  const _onReady = (event) => {
    setPlayer(event.target);
  };

  return (
    <>
      <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
    </>
  );
};

export default YoutubeErrorOnStart;
