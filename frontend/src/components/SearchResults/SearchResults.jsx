import { findAllByAltText } from '@testing-library/react';
import React, { useState } from 'react';
import useCustomForm from '../../hooks/useCustomForm';
import useAuth from '../../hooks/useAuth'
import axios from 'axios'
import { URL_HOST } from '../../urlHost'

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
}

const SearchResults = (props) => {

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

      function setNutritionValues(food){
          formData.name = food.description
          formData.cal = food.foodNutrients[3].value
          formData.fat = food.foodNutrients[1].value
          formData.carb = food.foodNutrients[2].value
          formData.sugar = food.foodNutrients[4].value
          formData.fiber = food.foodNutrients[5].value
          formData.protein = food.foodNutrients[0].value
          formData.servings = food.foodNutrients[4].value
          formData.url = food.foodNutrients[4].value
          saveFood()          
      }
      
        return ( 
            <div className='w-80 btn-center'>
                <table className="text-center table table-dark table-striped table-bordered">
                    <thead>
                        <tr>
                            <th className='col-4'>Name</th>
                            <th className='col-2'>Brand</th>
                            <th className='col-2'>Fats</th>
                            <th className='col-2'>Protein</th>
                            <th className='col-1'>Carbs</th>
                            <th className='col-1' />
                        </tr>
                    </thead>
                    <tbody>
                        {props.searchResults &&
                            props.searchResults.map((food) => {
                                let key = food.fdcId
                                return(
                                    <tr key={key}>
                                        <td>{food.description}</td>
                                        <td>{food.brandName}</td>
                                            <td>{food.foodNutrients[1] !== undefined ? `${food.foodNutrients[1].value}` : 'No Data'}</td>
                                            <td>{food.foodNutrients[0] !== undefined ? `${food.foodNutrients[0].value}` : 'No Data'}</td>
                                            <td>{food.foodNutrients[2] !== undefined ? `${food.foodNutrients[2].value}` : 'No Data'}</td>
                                        <td><button className="btn btn-secondary btn-sm btn-center" onClick={() => setNutritionValues(food)}>Track</button></td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        ) 
}
 
export default SearchResults;