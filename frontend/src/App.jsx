// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SearchPage from "./pages/SearchPage/SearchPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import useAuth from "./hooks/useAuth";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import axios from "axios";
import { URL_HOST } from "./urlHost";
import { useState } from "react";
import useCustomForm from "./hooks/useCustomForm"
import 'bootstrap/dist/css/bootstrap.min.css';

let initialValues = {
  name: '',
  cal: '',
  fat: '',
  carb: '',
  sugar: '',
  fiber: '',
  protein: '',
  servings: '',
  url: 'h',
};

function App() {
  const [user, token] = useAuth()
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    initialValues,
    saveFood,
  );
  const [chartData, setChartData] = useState();
  const [dailyCals, setDailyCals] = useState();
  const [dailyCarbs, setDailyCarbs] = useState();
  const [dailyFats, setDailyFats] = useState();
  const [dailyProteins, setDailyProteins] = useState();
  const [dailyWater, setDailyWater] = useState();
  const [todaysFoods, setTodaysFoods] = useState();

  useState(() =>{
    getDailyMacros()
    getDailyWater()
    getTodaysFoods()
    getDailyTotals()
    })

  async function saveFood(){
    try{
      let response = await axios.post(`${URL_HOST}/foods/`, formData, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      if(response.status === 201){
       }
    } catch (error) {
      console.log(error.message);
    }
  }
  
  async function getDailyTotals() {
    try{
      let response = await axios.get(`${URL_HOST}/daily_totals/`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      if(response.status === 200){
        setChartData(response.data)
      }
    } catch (error) {
    console.log(error.message);
    }
  }

  async function getDailyMacros() {
    try{
      console.log(URL_HOST)
      let response = await axios.get(`${URL_HOST}/consumed_foods/`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        if(response.status === 200){
          // console.log([response.data.cals, response.data.fats, response.data.carbs, response.data.proteins])
          // console.log(`logging data ${data}`)
          // setData([...data, [' ','6',response.data.cals, response.data.fats, response.data.carbs, response.data.proteins]])
          // console.log(dailyMacros)
          setDailyCals(response.data.cals) 
          setDailyCarbs(response.data.carbs)
          setDailyFats(response.data.fats) 
          setDailyProteins(response.data.proteins)
        } 
      } catch (error) {
          console.log(error.message)
        }
    }
  async function getTodaysFoods() {
    try{
      console.log(URL_HOST)
      let response = await axios.get(`${URL_HOST}/consumed_foods/?type=all`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        if(response.status === 200){
          setTodaysFoods(response.data)
          console.log(`todays foods: ${response.data}`)
        } 
      } catch (error) {
          console.log(error.message)
        }
    }
    
  async function getDailyWater() {
    try{
      let response = await axios.get(`${URL_HOST}/water/`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        if(response.status === 200){
          console.log(`water ${response.data.ounces}`)
          setDailyWater(response.data.ounces)
        }
        } catch (error) {
          console.log(error.message)
        }
  }

  async function deleteFoodEntry(id) {
    try{
      let response = await axios.delete(`${URL_HOST}/consumed_foods/${id}/`,{
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        if(response.status === 204){
          console.log(`deleted food id: ${id}`)
          getTodaysFoods()
          getDailyMacros()
        }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage deleteFoodEntry={deleteFoodEntry} todaysFoods={todaysFoods} getDailyTotals={getDailyTotals} chartData={chartData} setChartData={setChartData} dailyCals={dailyCals} dailyCarbs={dailyCarbs} dailyFats={dailyFats} dailyProteins ={dailyProteins} dailyWater={dailyWater} getDailyWater={getDailyWater}/>
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addfood" element={<SearchPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;


