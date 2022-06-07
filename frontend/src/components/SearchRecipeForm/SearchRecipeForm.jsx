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
            props.setSearchRecipeResults(response.data.hits)
            props.setSearchResults('')
            props.setSearchSavedResults('')
            console.log(response.data.hits)
            setSearchQuery('') 
           }
        } catch (error) {
          console.log(error.message);
        }
      }


    return ( 
        <div className='container'>
            <form onSubmit={handleSubmit}>
            <div className='row m-2'>
              <div className='col-9'>
                <input type='text' name='Search' placeholder='Recipes Search' value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
                </div>
              <div className='col-3'>
                <button type="submit" className='btn btn-outline-danger btn-sm'>Search</button>
                </div>
            </div>
            </form>
            {/* {searchResults &&
              <RecipeSearchResults searchResults={searchResults} saveFood={props.saveFood} />
            }              */}
        </div>
     );
}
 
export default SearchRecipeForm;