import { findAllByAltText } from '@testing-library/react';
import React, { useState } from 'react';
import useCustomForm from '../../hooks/useCustomForm';
import useAuth from '../../hooks/useAuth'
import axios from 'axios'
import { URL_HOST } from '../../urlHost'


let initialValues = {
    type: '',
    calories: '',
    date: '2022-06-02',
}

const ExerciseEntry = (props) => {
    const[user, token] = useAuth();
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
        initialValues,
        trackExercise
    );

    async function trackExercise(){
        try{
            const date = new Date();
            console.log(`Exercise: ${formData.type} Calories: ${formData.calories} ${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`)
            formData.date = (`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
            let response = await axios.post(`${URL_HOST}/exercise/`, formData, {
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
            <h2>Exercise</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' name='type' placeholder='Enter name of exercise' value={formData.type} onChange={handleInputChange} />
                <input type='text' name='calories' placeholder='Calories Burned' value={formData.calories} onChange={handleInputChange} />
                <button type="submit" >ADD</button>
            </form>
        </div>
     );
}
 
export default ExerciseEntry;