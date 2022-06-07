import SearchFoodForm from "../../components/SearchFoodForm/SearchFoodForm";
import CustomFoodEntry from "../../components/CustomFoodEntry/CustomFoodEntry";
import SearchRecipeForm from "../../components/SearchRecipeForm/SearchRecipeForm";
import SearchSavedFoodForm from "../../components/SearchSavedFoodsForm/SearchSavedFoodsForm"
import SearchResults from "../../components/SearchResults/SearchResults";
import React, { useEffect, useState } from 'react';
import RecipeSearchResults from "../../components/RecipeSearchResults/RecipeSearchResults";


const SearchPage = (props) => {
    const [searchFoodResults, setSearchFoodResults] = useState('');
    const [searchRecipeResults, setSearchRecipeResults] = useState('');
    const [searchSavedResults, setSearchSavedResults] = useState('');

    return ( 
        <div className="container">
            <h2>Food Search</h2>
            <div className="row m-4">
                <div className="col">
                    <SearchFoodForm setSearchResults={setSearchFoodResults} setSearchRecipeResults={setSearchRecipeResults} setSearchSavedResults={setSearchSavedResults}/>
                </div>
                <div className="col">
                    <SearchSavedFoodForm setSearchResults={setSearchFoodResults} setSearchRecipeResults={setSearchRecipeResults} setSearchSavedResults={setSearchSavedResults}/>
                </div>
                <div className="col">
                    <SearchRecipeForm setSearchResults={setSearchFoodResults} setSearchRecipeResults={setSearchRecipeResults} setSearchSavedResults={setSearchSavedResults}/>
                </div>
            </div>
            {searchFoodResults &&        
                <div>
                <SearchResults searchResults={searchFoodResults} saveFood={props.saveFood} />
                </div>
            }
            {searchRecipeResults &&        
                <div className="m-">
                <RecipeSearchResults searchResults={searchRecipeResults} saveFood={props.saveFood} />
                </div>
            }
            <CustomFoodEntry />
        </div>
        
     );
}
 
export default SearchPage;