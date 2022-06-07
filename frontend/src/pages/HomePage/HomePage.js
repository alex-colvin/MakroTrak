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
  const [cars, setCars] = useState([]);

  return(
    <div>
      <DailyMacros></DailyMacros>
      <ChartTracker getDailyTotals={props.getDailyTotals} chartData={props.chartData} setChartData={props.setChartData} />
      <Link to="/addfood">Click to Add Food</Link>
      <WaterEntry></WaterEntry>
      <WeightEntry></WeightEntry>
      <ExerciseEntry></ExerciseEntry>
    </div>
  )

  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       setCars(response.data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchCars();
  // }, [token]);
//   return (
//     <div className="container">
//       <h1>Home Page for {user.username}!</h1>
//       {cars &&
//         cars.map((car) => (
//           <p key={car.id}>
//             {car.year} {car.make} {car.model}
//           </p>
//         ))}
//     </div>
//   );
};

export default HomePage;
