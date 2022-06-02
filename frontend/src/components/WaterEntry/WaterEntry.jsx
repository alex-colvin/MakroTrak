import { findAllByAltText } from '@testing-library/react';
import React, { useState } from 'react';
import useCustomForm from '../../hooks/useCustomForm';
import useAuth from '../../hooks/useAuth'
import axios from 'axios'
import { URL_HOST } from '../../urlHost'


let initialValues = {
    ounces: '',
    date: '2022-06-02',
}

const WaterEntry = (props) => {
    
    const[user, token] = useAuth();
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
        initialValues,
        trackWater
    );

    async function trackWater(){
        try{
            const date = new Date();
            console.log(`${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`)
            formData.date = (`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
            let response = await axios.post(`${URL_HOST}/water/`, formData, {
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
                <input type='text' name='ounces' placeholder='How many ounces did you drink?' value={formData.ounces} onChange={handleInputChange} />
                <button type="submit" >ADD</button>
            </form>
        </div>
     );
}
 
export default WaterEntry;