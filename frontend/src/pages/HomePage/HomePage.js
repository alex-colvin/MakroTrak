import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";
import ChartTracker from "../../components/ChartTracker/ChartTracker";
import DailyMacros from "../../components/DailyMacros/DailyMacros";
import WaterEntry from "../../components/WaterEntry/WaterEntry";
import WeightEntry from "../../components/WeightEntry/WeightEntry";
import ExerciseEntry from "../../components/ExerciseEntry/ExerciseEntry";
import { Link } from "react-router-dom";



const HomePage = (props) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();


  return(
    <div className="container">
      <div className="row">
        <div  className="col-6">
          <DailyMacros getDailyMacros={props.getDailyMacros} setDailyMacros={props.setDailyMacros} dailyMacros={props.dailyMacros} />
        </div>
        <div  className="col-6">
          <ChartTracker className="col" getDailyTotals={props.getDailyTotals} chartData={props.chartData} setChartData={props.setChartData} />
        </div>
      </div>
      <div className="container">
        <div className="row" >
          <div className="col-3">
            <WaterEntry></WaterEntry>
          </div>
          <div className="col-3">
            <WeightEntry></WeightEntry>
          </div>
          <div className="col-6">
            <ExerciseEntry></ExerciseEntry>
          </div>
        </div>
      </div>
    </div>
  )
};

export default HomePage;
