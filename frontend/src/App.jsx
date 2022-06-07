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

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage getDailyTotals={getDailyTotals} chartData={chartData} setChartData={setChartData}/>
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
