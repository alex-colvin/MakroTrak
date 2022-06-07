import { findAllByAltText } from '@testing-library/react';
import React, { useState } from 'react';
import useCustomForm from '../../hooks/useCustomForm';
import useAuth from '../../hooks/useAuth'
import axios from 'axios'
import { URL_HOST } from '../../urlHost'
import RecipeSearchResults from '../RecipeSearchResults/RecipeSearchResults'


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

const SearchRecipeForm = (props) => {
    const [user, token] = useAuth();
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
        initialValues,
        searchNewRecipe,
    );
    const [searchResults, setSearchResults] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    
// This function sends a GET request to the EDAMAM API 
    async function searchNewRecipe(){
        try{
          let response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=d2bf486e&app_key=ddf0d63b2c30afa4b6919d62795f2f4c`)
          if(response.status === 200){
            setSearchResults(response.data.hits)
            console.log(response.data.hits)
            reset() 
           }
        } catch (error) {
          console.log(error.message);
        }
      }


    return ( 
        <div>
            <form onSubmit={handleSubmit}>
            <input type='text' name='Search' placeholder='Recipes Search' value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
                <button type="submit" >Search</button>
            </form>
             <RecipeSearchResults searchResults={searchResults} saveFood={props.saveFood} />;                
        </div>
     );
}
 
export default SearchRecipeForm;