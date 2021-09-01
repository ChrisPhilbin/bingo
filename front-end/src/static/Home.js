import React from "react";
import BingoCard from "../components/player/BingoCard";
import CreateNewGame from "../components/host/CreateNewGame";

const Home = () => {
  return (
    <div>
      <h3>Welcome to Meeting Bingo!</h3>

      <BingoCard />

      <CreateNewGame />
    </div>
  );
};

export default Home;
