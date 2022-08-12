import React, { useEffect, useState, useRef } from "react";
import YouTube from "react-youtube";
import { getReadableTimeString, timeoutPromise } from "../libs/misc.js";

const VideoCollagePlaylist = ({ playListData }) => {
  //const [player, setPlayer] = useState(null);
  const playerRef = useRef(null);
  const [buttonTitle, setButtonTitle] = useState("Play");
  const [playerIsReady, setPlayerIsReady] = useState(false);
  const playerIsReadyRef = useRef(false);
  const [curFragment, setCurFragment] = useState(-1);
  const curFragmentRef = useRef(-1);
  const someRef = useRef(-1);
  const [videoId, setVideoId] = useState();
  const [switchToRerender, setSwitchToRerender] = useState(false);

  const opts = {
    width: "100%",
    playerVars: {
      autoplay: 0,
      mute: 0,
    },
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (
        playerRef.current?.playerInfo?.playerState === VIDEO_PLAYING_STATE &&
        curFragmentRef.current > -1 &&
        playerIsReadyRef.current
      ) {
        const elapsed_seconds = Math.floor(playerRef.current.getCurrentTime());

        if (playListData[curFragmentRef.current].end === elapsed_seconds) {
          switchToNextVideoFragment();
        }

        const formattedCurrentTime = getReadableTimeString(elapsed_seconds);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (playerRef.current && curFragment >= 0 && playerIsReady) {
      if (playListData[curFragment].id !== videoId) {
        console.log(playListData[curFragment].id, videoId);
        setVideoId((prev) => {
          setPlayerIsReady(() => {
            playerIsReadyRef.current = false;
            return false;
          });
          return playListData[curFragment].id;
        });
      } else {
        launchCurVideoFragment();
      }
    }
  }, [curFragment, videoId, playerIsReady, switchToRerender]);

  const launchCurVideoFragment = async () => {
    playerRef.current?.playVideo();
    setTimeout(() => {
      console.log("seeking to ", curFragment, playListData[curFragment].start);
      playerRef.current.seekTo(playListData[curFragment].start);
    }, 500);
  };

  const switchToNextVideoFragment = () => {
    setCurFragment((prev) => {
      let newValue;
      if (prev < playListData.length - 1) {
        newValue = prev + 1;
      } else {
        newValue = 0;
        setSwitchToRerender((prev) => !prev);
      }
      console.log("newValue of curFragment:", newValue);
      curFragmentRef.current = newValue;
      return newValue;
    });
  };

  const switchToSpecifiedVideoFragment = (index) => {
    setCurFragment((prev) => {
      if (index < playListData.length) {
        curFragmentRef.current = index;
        setSwitchToRerender((prev) => !prev);
        return index;
      }
    });
  };

  const _onReady = (event) => {
    someRef.current = 1;
    //
    playerRef.current = event.target;

    setPlayerIsReady(() => {
      playerIsReadyRef.current = true;
      return true;
    });
  };

  return (
    <>
      <div className="video-grid">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={_onReady}
          onStateChange={() => {
            // console.log(
            //   "State changed",
            if (
              playerRef.current?.playerInfo?.playerState === VIDEO_PLAYING_STATE
            ) {
              setButtonTitle("Next");
            } else if (
              playerRef.current?.playerInfo?.playerState === VIDEO_PAUSED_STATE
            ) {
              setButtonTitle("Play");
            }
            // playerRef.current?.playerInfo?.playerState
            // );
          }}
        />
        <div>
          <button
            style={{ margin: 15 }}
            onClick={() => {
              console.log(playerRef.current?.playerInfo?.playerState);
              if (
                playerRef.current?.playerInfo?.playerState ===
                  VIDEO_HAS_NOT_PLAYED_STATE ||
                playerRef.current?.playerInfo?.playerState ===
                  VIDEO_IN_QUEUE_STATE ||
                playerRef.current?.playerInfo?.playerState ===
                  VIDEO_PLAYING_STATE
              )
                switchToNextVideoFragment();
              else {
                playerRef.current?.playVideo();
              }
            }}
          >
            {buttonTitle}
          </button>
          <div>
            {playListData &&
              playListData.map((item, index) => {
                return (
                  <div
                    key={index}
                    onDoubleClick={() => {
                      switchToSpecifiedVideoFragment(index);
                    }}
                  >
                    {index === curFragment ? (
                      <b>Slice {index}</b>
                    ) : (
                      <>Slice {index}</>
                    )}

                    {/* {index === curFragment && </b>} */}
                    {/* {item.id} {getReadableTimeString(item.start)} -{" "}
                    {getReadableTimeString(item.end)} */}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCollagePlaylist;

const VIDEO_PAUSED_STATE = 2;
const VIDEO_PLAYING_STATE = 1;
const VIDEO_HAS_NOT_PLAYED_STATE = -1;
const VIDEO_IN_QUEUE_STATE = 5;
/*
-1 – воспроизведение видео не началось
0 – воспроизведение видео завершено
1 – воспроизведение
2 – пауза
3 – буферизация
5 – видео находится в очереди
*/
