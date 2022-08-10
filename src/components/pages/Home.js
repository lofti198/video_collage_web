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
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlists.list);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (playlists.length) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, []);


  return (
    <div className="playlists-container">
      <div className={classes.header}>
        <Typography variant="h4">My playlists</Typography>
      </div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3rem",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!playlists.length && (
              <TableRow>
                <TableCell align="center">
                  List is empty, please fill it!
                </TableCell>
              </TableRow>
            )}
            {playlists.map(({ id }) => (
              <TableRow key={id}>
                <TableCell align="left">
                  <Link to={`/playlist/${id}`}>{id}</Link>
                </TableCell>

                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      dispatch(removePlaylistAsync(id));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Home;
