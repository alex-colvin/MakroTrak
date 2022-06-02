const SearchResults = (props) => {


        return ( 
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Brand</th>
                            <th>Fats</th>
                            <th>Protein</th>
                            <th>Carbs</th>
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
                                        <td>{food.foodNutrients[1].value}</td>
                                        <td>{food.foodNutrients[0].value}</td>
                                        <td>{food.foodNutrients[2].value}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        ) 
}
 
export default SearchResults;