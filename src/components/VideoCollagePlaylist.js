import React, { useEffect, useState, useRef } from "react";
import YouTube from "react-youtube";

const VideoCollagePlaylist = () => {
  const [player, setPlayer] = useState(null);
  const [curFragment, setCurFragment] = useState(0);
  const [videoId, setVideoId] = useState("VcT8puLpNKA");
  const switchCalledAtLeastOnceRef = useRef(false);
  const opts = {
    //  height: '390',
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: 0,
    },
  };

  useEffect(() => {
    console.log("useEffect init");
    // setVideoId(demoPlaylist[0].id);
  }, []);

  useEffect(() => {
    console.log("useEffect for player", player);
    if (switchCalledAtLeastOnceRef.current === false && player) {
      switchCalledAtLeastOnceRef.current = true;
      switchNextVideoFragment();
    }
  }, [player]);

  // useEffect(() => {
  //...
  // }, [videoId]);
  // useEffect(() => {
  //   if (
  //     player &&
  //     videoId.length > 0 &&
  //     switchCalledAtLeastOnceRef.current === false
  //   ) {
  //     switchCalledAtLeastOnceRef.current = true;
  //     switchNextVideoFragment();
  //   } else {
  //     console.log("useeffect", player, videoId);
  //   }
  // }, [player, videoId]);

  const switchNextVideoFragment = () => {
    console.log(
      "switchNextVideoFragment",
      curFragment,
      demoPlaylist[curFragment].id
    );

    // setVideoId(demoPlaylist[curFragment].id);
    console.log(player);
    player.playVideo();
    player.seekTo(demoPlaylist[curFragment].start);
    setTimeout(() => {
      if (curFragment < demoPlaylist.length - 1) switchNextVideoFragment();
      else console.log("Cycle End");
    }, 1000 * (demoPlaylist[curFragment].end - demoPlaylist[curFragment].start));

    setCurFragment((prev) => {
      if (prev < demoPlaylist.length - 1) return prev + 1;
      else return 0;
    });
  };

  const _onReady = (event) => {
    console.log("onready");
    //
    setPlayer(event.target);
  };

  return (
    <>
      Just test of updates
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
