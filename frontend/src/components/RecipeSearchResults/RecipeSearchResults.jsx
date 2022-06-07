import { findAllByAltText } from '@testing-library/react';
import React, { useState } from 'react';
import useCustomForm from '../../hooks/useCustomForm';
import useAuth from '../../hooks/useAuth'
import axios from 'axios'
import { URL_HOST } from '../../urlHost'
import { Link } from "react-router-dom";

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

const RecipeSearchResults = (props) => {

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
      //Sets the form date to post to database. Divides total recipe quantities by the number of servings(food.recipe.yield)
      function setNutritionValues(food){
          formData.name = food.recipe.label
          formData.cal = (food.recipe.calories / food.recipe.yield)
          formData.fat = (food.recipe.totalNutrients.FAT.quantity / food.recipe.yield)
          formData.carb = (food.recipe.totalNutrients.CHOCDF.quantity / food.recipe.yield)
          formData.sugar = (food.recipe.totalNutrients.SUGAR.quantity / food.recipe.yield)
          formData.fiber = (food.recipe.totalNutrients.FIBTG.quantity / food.recipe.yield)
          formData.protein = (food.recipe.totalNutrients.PROCNT.quantity / food.recipe.yield)
          formData.servings = food.recipe.yield
          formData.url = food.recipe.url
          saveFood()          
      }

        return ( 
            <div className='w-80 btn-center'>
                <table className="text-center table table-dark table-striped table-bordered">
                    <thead>
                        <tr>
                            <th className='col-4'>Name</th>
                            <th className='col-1'>Total Cal</th>
                            <th className='col-1'>Fats</th>
                            <th className='col-1'>Protein</th>
                            <th className='col-1'>Carbs</th>
                            <th className='col-1'>Servings</th>
                            <th className='col-2'>Link</th>
                            <th className='col-1' />
                        </tr>
                    </thead>
                    <tbody>
                        {props.searchResults &&
                            props.searchResults.map((food) => {
                                let key = food.recipe.uri
                                return(
                                    <tr key={key}>
                                        <td>{food.recipe.label}</td>
                                        <td>{food.recipe.calories.toFixed(0)}</td>
                                        <td>{food.recipe.totalNutrients.FAT.quantity.toFixed(0)}</td>
                                        <td>{food.recipe.totalNutrients.PROCNT.quantity.toFixed(0)}</td>
                                        <td>{food.recipe.totalNutrients.CHOCDF.quantity.toFixed(0)}</td>
                                        <td>{food.recipe.yield}</td>
                                        <td><a href={food.recipe.url} target="_blank">Jump to Recipe</a></td>
                                        <td><button className="btn btn-secondary btn-sm btn-center" onClick={() => setNutritionValues(food)}>Add</button></td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        ) 
}
 
export default RecipeSearchResults;