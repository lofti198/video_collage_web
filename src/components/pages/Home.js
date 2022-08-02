import React from "react";
import { Link } from "react-router-dom";

const Home = ({ state }) => {
  console.log(state);
  return (
    <>
      {state &&
        state.map((item) => {
          return (
            <div key={item.id}>
              <Link to={`/playlist/${item.id}`} state={state}>
                {item.id}
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default Home;
