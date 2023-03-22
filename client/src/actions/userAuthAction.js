import {LOADING} from "./types";
//import axios from "axios";


//example
/*export const fetchRecipes = (text,offset) => dispatch => {
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_RECIPE_API_KEY}&query=${text}&diet=vegetarian&number=9&offset=${offset}`)
        .then(response => dispatch({
            type:FETCH_FOODS,
            payload: response.data.results
        }))
        .catch(err => console.log(err))
}*/


export const setLoading = () => {
    return{
        type:LOADING
    };
};