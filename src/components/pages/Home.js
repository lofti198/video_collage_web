import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { CircularProgress } from "@material-ui/core";
// import DeleteIcon from "@material-ui/icons/Delete";
// import IconButton from "@material-ui/core/IconButton";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Typography from "@material-ui/core/Typography";
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
// import DeleteIcon from "@mui/icons-material/Delete";

import { Delete as DeleteIcon } from "@mui/icons-material";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const playlists = useSelector((state) => {
    return state.playlists.list;
  });

  return (
    <>
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Typography variant="h4" /*style={style}*/>My playlists</Typography>
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

                    <TableCell align="right" onClick={() => {}}>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
};

export default Home;
