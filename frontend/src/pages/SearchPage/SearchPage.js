import SearchFoodForm from "../../components/SearchFoodForm/SearchFoodForm";
import CustomFoodEntry from "../../components/CustomFoodEntry/CustomFoodEntry";
import SearchRecipeForm from "../../components/SearchRecipeForm/SearchRecipeForm";

const SearchPage = (props) => {
    return ( 
        <div>
            <SearchFoodForm />
            <SearchRecipeForm />
            <CustomFoodEntry />
        </div>
        
     );
}
 
export default SearchPage;