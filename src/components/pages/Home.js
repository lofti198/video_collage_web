import React, { useState } from "react";
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

const useStyles = makeStyles({
  header: {
    marginTop: "50px",
  },
});

const removePlaylistAsync = (id) => {
  return async (dispatch) => {
    dispatch(removePlaylist({ id: id }));
  };
};

const Home = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const playlists = useSelector((state) => {
    return state.playlists.list;
  });
  const dispatch = useDispatch();

  return (
    <div className="playlists-container">
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Typography variant="h4" className={classes.header}>
            My playlists
          </Typography>
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
