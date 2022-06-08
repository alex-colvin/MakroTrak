import axios from "axios";
import { Chart } from "react-google-charts";
import React, { useState, useEffect } from 'react';

import { URL_HOST } from "../../urlHost";
import useAuth from "../../hooks/useAuth";

const ChartTracker = (props) => {
  const [user, token] = useAuth();
  const [data, setData] = useState([["Date", "Water","Excercise Duration","Calories x10","Weight"]]);

  useState(() =>{
    props.getDailyTotals()
    })

  useEffect(() => {
    if(props.chartData !== undefined && data.length <= 1){
      let tempTotals = [...data];
      let dailyTotals = props.chartData.map((el) => {
        let calories = (el.calories/10)
      tempTotals.push([el.date, el.water, el.calories_burned, calories, el.weight])
      return [el.date, el.water, el.calories_burned, el.calories, el.weight]
      })
      setData(tempTotals)
    } 
  },[props.chartData])  

  const options = {
    chart: {
      title: "Fitness Data Tracker",
    },
    width: 600,
    height: 300,
    series: {
      // Gives each series an axis name that matches the Y-axis below.
      0: { axis: "Water" },
      1: { axis: "Exercise" },
      2: { axis: "Calories" },
      3: { axis: "Weight" },
    },
    axes: {
      // Adds labels to each axis; they don't have to match the axis names.
      y: {
        Water: { label: "Water" },
        Exercise: { label: "Exercise" },
        Calories: { label: "Calories" },
        Weight: { label: "Weight" },
      },
    legend:{position: 'none'}
    }
  }
  
  // const data = [["Date", "Water Intake (oz)","Excercise Duration","Calorie Intake","Weight(lbs)"],['2022-06-06', 128, 30, 120, 180],  ['2022-06-07', 125, 20, 120, 185],['2022-06-08', 100, 20, 120, 185],['2022-06-09', 139, 20, 120, 185],['2022-06-10', 100, 20, 120, 185],['2022-06-11', 150, 20, 120, 185],['2022-06-12', 125, 20, 120, 255]]

    return ( 
        <div>
            <Chart
                chartType="LineChart"
                data={data}
                options={options}
                width="100%"
                height="400px"
                legendToggle
            />
        </div>     );
}
 
export default ChartTracker;