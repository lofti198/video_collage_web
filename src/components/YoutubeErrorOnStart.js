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
    let timer2;
    let timer1;
    if (playerRef.current && isReady) {
      timer1 = setTimeout(() => {
        playerRef.current.seekTo(3);
        timer2 = setTimeout(() => {
          playerRef.current.playVideo();
        }, 1000);
      }, 1000);
    }

    return () => {
      timer1 && clearTimeout(timer1);
      timer2 && clearTimeout(timer2);
    };
  }, [isReady]);

  const _onReady = (event) => {
    playerRef.current = event.target;
    setIsReady(true);
  };

  return (
    <>
      <div style={{ margin: auto }}>
        <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
      </div>
    </>
  );
};

export default YoutubeErrorOnStart;
