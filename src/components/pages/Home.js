import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
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
import { makeStyles } from "@mui/styles";

import { Delete as DeleteIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { removePlaylist } from "../../redux/playlistsSlice";

const removePlaylistAsync = (id) => {
  return async (dispatch) => {
    dispatch(removePlaylist({ id: id }));
  };
};

const useStyles = makeStyles({
  header: {
    marginTop: "30px",
  },
});

const Home = () => {
  console.log("Home render");
  const classes = useStyles();
  const playlists = useSelector((state) => state.playlists.list);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (playlists.length) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, []);

  const dispatch = useDispatch();

  return (
    <div className="playlists-container">
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10rem",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className={classes.header}>
            <Typography variant="h4">My playlists</Typography>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playlists &&
                playlists.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="left">
                      <Link to={`/playlist/${item.id}`}>{item.id}</Link>
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          dispatch(removePlaylistAsync(item.id));
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default Home;
