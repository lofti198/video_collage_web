import React from "react";
import { useParams } from "react-router-dom";

const PlayList = () => {
  const { id } = useParams();

  return <div>PlayList {id}</div>;
};

export default PlayList;
