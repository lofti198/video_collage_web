import React, { useEffect, useState, useRef } from "react";
import YouTube from "react-youtube";
import { getReadableTimeString, timeoutPromise } from "../libs/misc.js";
import {
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
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
          <div style={{ margin: 15 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Slice</b>
                  </TableCell>
                  <TableCell>
                    <b>Start time</b>
                  </TableCell>
                  <TableCell>
                    <b>Duration</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!playListData.length && (
                  <TableRow>
                    <TableCell align="center">
                      List is empty, please fill it!
                    </TableCell>
                  </TableRow>
                )}
                {playListData.map((item, index) => (
                  <TableRow
                    key={index}
                    onClick={() => {
                      switchToSpecifiedVideoFragment(index);
                    }}
                  >
                    <TableCell>
                      {index === curFragment ? (
                        <b>Slice {index + 1}</b>
                      ) : (
                        <>Slice {index + 1}</>
                      )}
                    </TableCell>

                    <TableCell>{getReadableTimeString(item.start)}</TableCell>
                    <TableCell>
                      {getReadableTimeString(item.end - item.start)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
-1 ??? ?????????????????????????????? ?????????? ???? ????????????????
0 ??? ?????????????????????????????? ?????????? ??????????????????
1 ??? ??????????????????????????????
2 ??? ??????????
3 ??? ??????????????????????
5 ??? ?????????? ?????????????????? ?? ??????????????
*/
/*
            {playListData &&
              playListData.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      switchToSpecifiedVideoFragment(index);
                    }}
                  >
                    {index === curFragment ? (
                      <b>Slice {index}</b>
                    ) : (
                      <>Slice {index}</>
                    )}
                    <i> - {getReadableTimeString(item.start)}</i>
                    <i> - {getReadableTimeString(item.end - item.start)}</i>

                    </div>
                    );
                  })} */
