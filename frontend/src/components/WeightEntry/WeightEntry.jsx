import { findAllByAltText } from '@testing-library/react';
import React, { useState } from 'react';
import useCustomForm from '../../hooks/useCustomForm';
import useAuth from '../../hooks/useAuth'
import axios from 'axios'
import { URL_HOST } from '../../urlHost'

let initialValues = {
    weight: '',
    date: '2022-06-02',
}

const WeightEntry = (props) => {
    const[user, token] = useAuth();
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
        initialValues,
        trackWeight
    );

    async function trackWeight(){
        try{
            const date = new Date();
            console.log(`Weight: ${formData.weight} ${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`)
            formData.date = (`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
            let response = await axios.post(`${URL_HOST}/weight/`, formData, {
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
            <h2>Weight</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' name='weight' placeholder='Enter weight' value={formData.weight} onChange={handleInputChange} />
                <button type="submit" >ADD</button>
            </form>
        </div>
     );
}
 
export default WeightEntry;