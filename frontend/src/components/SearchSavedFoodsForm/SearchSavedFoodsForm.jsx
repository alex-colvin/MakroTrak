import { findAllByAltText } from '@testing-library/react';
import React, { useState } from 'react';
import useCustomForm from '../../hooks/useCustomForm';
import useAuth from '../../hooks/useAuth'
import axios from 'axios'
import { URL_HOST } from '../../urlHost'
import SearchResults from '../SearchResults/SearchResults'


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

const SearchFoodForm = (props) => {
    const [user, token] = useAuth();
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
        initialValues,
        searchNewFood,
    );
    const [searchResults, setSearchResults] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    
// This function sends a GET request to the USDA API 
    async function searchNewFood(){
        try{
          let response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchQuery}&pageSize=25&api_key=${process.env.REACT_APP_USDA_API_KEY}`)
          if(response.status === 200){
            setSearchResults(response.data.foods)
            reset() 
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
                        <input type='text' name='Search' placeholder='Search Saved Foods' value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
                    </div>
                    <div className='col-3'>
                        <button className='btn btn-outline-danger btn-sm' type="submit" >Search</button>
                    </div>
                </div>
            </form>
            {searchResults &&        
              <SearchResults searchResults={searchResults} saveFood={props.saveFood} /> 
            }               
        </div>
     );
}
 
export default SearchFoodForm;