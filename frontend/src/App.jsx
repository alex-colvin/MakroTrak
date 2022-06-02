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
import { useState } from "react/cjs/react.production.min";
import useCustomForm from "./hooks/useCustomForm"

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

  async function saveFood(){
    try{
      let response = await axios.post(`${URL_HOST}/foods/`, formData, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      if(response.status === 201){
        reset() 
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
              <HomePage />
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
