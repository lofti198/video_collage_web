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
import { load, removePlaylist } from "../../redux/playlistsSlice";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import { data } from "../../data";
const useStyles = makeStyles({
  header: {
    marginTop: "30px",
  },
});

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, list } = useSelector((state) => state.playlists);
  const [json, setJson] = useState("");

  useEffect(() => {
    // setJson(JSON.stringify(data));
    setJson(data);
  }, []);

  const handleChangeJson = (e) => {
    console.log(e);
    console.log(json);
  };
  return (
    <div className="playlists-container">
      <div className={classes.header}>
        <Typography variant="h4">My playlists</Typography>
      </div>
      {loading ? (
        <div className="progress-bar">
          <CircularProgress />
        </div>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!list.length && (
                <TableRow>
                  <TableCell align="center">
                    List is empty, please fill it!
                  </TableCell>
                </TableRow>
              )}
              {list.map(({ id }) => (
                <TableRow key={id}>
                  <TableCell align="left">
                    <Link to={`/playlist/${id}`}>{id}</Link>
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      onClick={() => dispatch(removePlaylist({ id }))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div>
            <Editor value={json} onChange={handleChangeJson} />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
