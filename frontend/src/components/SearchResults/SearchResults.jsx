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
            reset() 
           }
        } catch (error) {
          console.log(error.message);
        }
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
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Fats</th>
                            <th>Protein</th>
                            <th>Carbs</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {props.searchResults &&
                            props.searchResults.map((food) => {
                                let key = food.fdcId
                                return(
                                    <tr key={key}>
                                        <td>{food.fdcId}</td>
                                        <td>{food.description}</td>
                                        <td>{food.brandName}</td>
                                        <td>{food.foodNutrients[1].value}</td>
                                        <td>{food.foodNutrients[0].value}</td>
                                        <td>{food.foodNutrients[2].value}</td>
                                        <td><button className="btn btn-secondary btn-sm btn-center" onClick={() => setNutritionValues(food)}>Add</button></td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        ) 
}
 
export default SearchResults;