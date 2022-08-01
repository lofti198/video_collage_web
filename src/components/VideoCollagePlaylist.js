import React, { useEffect, useState, useRef } from "react";
import YouTube from "react-youtube";
import { getReadableTimeString, timeoutPromise } from "../libs/misc.js";
const VideoCollagePlaylist = () => {
  //const [player, setPlayer] = useState(null);
  const playerRef = useRef(null);

  const [playerIsReady, setPlayerIsReady] = useState(false);
  const playerIsReadyRef = useRef(false);
  const [curFragment, setCurFragment] = useState(-1);
  const curFragmentRef = useRef(-1);
  const someRef = useRef(-1);
  const [videoId, setVideoId] = useState();

  // const switchCalledAtLeastOnceRef = useRef(false);
  const opts = {
    //  height: '390',
    width: "100%",
    playerVars: {
      autoplay: 0,
      mute: 0,
    },
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      // console.log(
      //   "interval callback",
      //   playerRef.current,
      //   playerIsReadyRef.current
      // );
      if (
        playerRef.current?.playerInfo?.playerState === VIDEO_PLAYING_STATE &&
        curFragmentRef.current > -1 &&
        playerIsReadyRef.current
      ) {
        //console.log("interval callback 1");
        const elapsed_seconds = Math.floor(playerRef.current.getCurrentTime());
        console.log(
          curFragmentRef.current,
          demoPlaylist[curFragmentRef.current].end,
          elapsed_seconds
        );
        if (demoPlaylist[curFragmentRef.current].end === elapsed_seconds) {
          console.log("Should switch!!!", elapsed_seconds);
          switchToNextVideoFragment();
        }

        const formattedCurrentTime = getReadableTimeString(elapsed_seconds);

        //console.log(formattedCurrentTime);
      }
    }, 1000);

    // setTimeout(async () => {
    //   console.log("hihihihih");
    //   switchToNextVideoFragment();
    // }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (
      playerRef.current &&
      curFragment >= 0 &&
      playerIsReady
      //switchCalledAtLeastOnceRef.current === false
    ) {
      console.log("useEffect", curFragment, videoId, playerIsReadyRef.current);
      if (demoPlaylist[curFragment].id !== videoId) {
        console.log(demoPlaylist[curFragment].id, videoId);
        setVideoId((prev) => {
          setPlayerIsReady(() => {
            playerIsReadyRef.current = false;
            return false;
          });
          return demoPlaylist[curFragment].id;
        });
      } else {
        launchCurVideoFragment();
      }
      // switchCalledAtLeastOnceRef.current = true;
      //switchNextVideoFragment();
    }
  }, [curFragment, videoId, playerIsReady]);

  const launchCurVideoFragment = async () => {
    console.log(
      "seekTo",
      demoPlaylist[curFragment].start,
      playerRef.current,
      playerRef?.current?.o
    );
    playerRef.current.playVideo();
    setTimeout(() => {
      playerRef.current.seekTo(demoPlaylist[curFragment].start); //demoPlaylist[curFragment].start);
      //playerRef.current.playVideo();
    }, 500);

    // setTimeout(() => {
    //   playerRef.current.playVideo();
    // }, 2000);
    // await timeoutPromise(1000);
  };

  const switchToNextVideoFragment = () => {
    setCurFragment((prev) => {
      let newValue;
      if (prev < demoPlaylist.length - 1) {
        newValue = prev + 1;
      } else {
        newValue = 0;
      }
      curFragmentRef.current = newValue;
      return newValue;
    });
  };

  const _onReady = (event) => {
    console.log("onready");

    someRef.current = 1;
    //
    playerRef.current = event.target;
    console.log("just", playerRef.current, playerRef?.current?.o);
    setPlayerIsReady(() => {
      console.log("setting true");
      playerIsReadyRef.current = true;
      return true;
    });
  };

  return (
    <>
      Just test of updates
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={_onReady}
        // onStateChange={(e) => {
        //   console.log("on state changed", e, e.target.getPlayerState());
        // }}
      />
      <button
        onClick={() => {
          console.log("go", playerRef.current);
          switchToNextVideoFragment();
        }}
      >
        Go
      </button>
    </>
  );
};

export default VideoCollagePlaylist;

const demoPlaylist = [
  { id: "VcT8puLpNKA", start: 15, end: 17 },
  { id: "VcT8puLpNKA", start: 60, end: 63 },
  { id: "hlkDQ7xa0fc", start: 160, end: 162 },
];

const VIDEO_PAUSED_STATE = 2;
const VIDEO_PLAYING_STATE = 1;
