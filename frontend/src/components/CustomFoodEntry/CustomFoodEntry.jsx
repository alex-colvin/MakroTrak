import { findAllByAltText } from '@testing-library/react';
import React, { useState } from 'react';
import useCustomForm from '../../hooks/useCustomForm';
import useAuth from '../../hooks/useAuth'
import axios from 'axios'
import { URL_HOST } from '../../urlHost'
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

// import './PostSong.css'

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

const SaveFoodForm = (props) => {
    
    const [user, token] = useAuth();
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
            trackFood(response.data.id)
            reset() 
           }
        } catch (error) {
          console.log(error.message);
        }
      }

      async function trackFood(foodId){
        let date = new Date();
        console.log(`${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`);
        let formatDate = (`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
        let response = await axios.post(`${URL_HOST}/consumed_foods/`, {"food_id": foodId, "date": formatDate}, {
            headers: {
                Authorization: 'Bearer ' + token
              }
        })
      }


    return ( 
        <div className='container'>
          <h2 className='m-4'>Custom Food Entry</h2>
          <form onSubmit={handleSubmit}>
              <div className='row m-2'>
                <div className='form-group col-8'>
                  <input className='form-control' type='text' name='name' placeholder='Enter Name of Food' value={formData.name} onChange={handleInputChange} />
                </div>
                <div className='col-2'>
                  <input className='form-control' type='text' name='cal' placeholder='Enter Calories' value={formData.cal} onChange={handleInputChange} />
                </div>
                <div className='col-2'>
                  <input className='form-control' type='text' name='fat' placeholder='Enter Fats' value={formData.fat} onChange={handleInputChange} />
                </div>
              </div>
              <div className='row m-2'>
                <div className='col-2'>
                  <input className='form-control' type='text' name='carb' placeholder='Enter Carbs' value={formData.carb} onChange={handleInputChange} />
                </div>
                <div className='col-md-2'>
                  <input className='form-control' type='text' name='sugar' placeholder='Enter Sugars' value={formData.sugar} onChange={handleInputChange} />
                </div>
                <div className='col-md-2'>
                  <input className='form-control' type='text' name='fiber' placeholder='Enter Fiber' value={formData.fiber} onChange={handleInputChange} />
                </div>
                <div className='col-md-2'>
                  <input className='form-control' type='text' name='protein' placeholder='Enter Protein' value={formData.protein} onChange={handleInputChange} />
                </div>
                <div className='col-md-2'>
                  <input className='form-control' type='text' name='servings' placeholder='Enter # of Servings' value={formData.servings} onChange={handleInputChange} />
                </div>
                <div className='col-md-2'>
                  <button className='btn btn-outline-danger' type="submit" >ADD</button>
                </div>
              </div>
          </form>
        </div>
     );
}
 
export default SaveFoodForm;