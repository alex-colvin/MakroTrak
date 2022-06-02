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
    servings: '1',
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
            reset() 
           }
        } catch (error) {
          console.log(error.message);
        }
      }


    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' name='name' placeholder='Enter Name of Food' value={formData.name} onChange={handleInputChange} />
                <input type='text' name='cal' placeholder='Enter Calories' value={formData.cal} onChange={handleInputChange} />
                <input type='text' name='fat' placeholder='Enter Fats' value={formData.fat} onChange={handleInputChange} />
                <input type='text' name='carb' placeholder='Enter Carbohydrates' value={formData.carb} onChange={handleInputChange} />
                <input type='text' name='sugar' placeholder='Enter Sugars' value={formData.sugar} onChange={handleInputChange} />
                <input type='text' name='fiber' placeholder='Enter Fiber' value={formData.fiber} onChange={handleInputChange} />
                <input type='text' name='protein' placeholder='Enter Protein' value={formData.protein} onChange={handleInputChange} />
                <input type='text' name='servings' placeholder='Enter # of Servings' value={formData.servings} onChange={handleInputChange} />
                <button type="submit" >ADD</button>
            </form>
        </div>
     );
}
 
export default SaveFoodForm;