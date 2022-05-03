import React from "react";
import DailyRaffle from "../../components/daily-raffle/DailyRaffle";
import NavigationBar from "../../components/navigationbar/NavigationBar";

const Raffle = () => {
  return (
    <div>
      <NavigationBar home />
      <DailyRaffle />
    </div>
  );
};

export default Raffle;
