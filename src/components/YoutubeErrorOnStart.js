import React, { useEffect, useState, useRef } from "react";
import YouTube from "react-youtube";

const YoutubeErrorOnStart = () => {
  // const [player, setPlayer] = useState(null);
  const playerRef = useRef();
  const [isReady, setIsReady] = useState(false);
  const [videoId, setVideoId] = useState("VcT8puLpNKA");

  const opts = {
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: 0,
    },
  };

  useEffect(() => {
    if (playerRef.current && isReady) {
      setTimeout(() => {
        console.log(playerRef.current, isReady);
        playerRef.current.seekTo(3);
        setTimeout(() => {
          playerRef.current.playVideo();
        }, 1000);
      }, 1000);
    }
  }, [isReady]);

  const _onReady = (event) => {
    playerRef.current = event.target;
    setIsReady(true);
  };

  return (
    <>
      <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
    </>
  );
};

export default YoutubeErrorOnStart;
