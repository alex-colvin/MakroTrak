import SearchFoodForm from "../../components/SearchFoodForm/SearchFoodForm";
import CustomFoodEntry from "../../components/CustomFoodEntry/CustomFoodEntry";

const SearchPage = (props) => {
    return ( 
        <div>
            <SearchFoodForm />
            <CustomFoodEntry />
        </div>
        
     );
}
 
export default SearchPage;