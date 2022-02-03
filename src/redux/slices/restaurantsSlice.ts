import { createAsyncThunk, createSlice, PayloadAction  } from "@reduxjs/toolkit";

import { restaurantsAPI } from "../../api/api";
import { AddRestaurantType, IRestaurant, RestaurantsInitialState } from "../../types/Restaurants";


export const getRestaurants = createAsyncThunk(
    'restaurants/getRestaurants',
    async function(_, { dispatch }) {
        try {
            const data: IRestaurant[] = await restaurantsAPI.getRestaurants();

            dispatch(setRestaurants(data.reverse()));

        } catch (error) {
            error instanceof Error &&  alert(error.message)
        }
    }
)

export const addRestaurant = createAsyncThunk(
    'restaurants/addRestaurant',
    async function(values: AddRestaurantType, { dispatch }) {
        try {
            const data: IRestaurant = await restaurantsAPI.addRestaurant(values);
            
            dispatch(addRestaurantToStore(data));

        } catch (error) {
            error instanceof Error &&  alert(error.message)
        } 
    }
)


const initialState: RestaurantsInitialState = {
    loadingInProgress: false,
    restaurants: []
}

export const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        addRestaurantToStore(state, action: PayloadAction<IRestaurant>) {
            state.restaurants.unshift(action.payload); 
        },
        setRestaurants(state, action: PayloadAction<IRestaurant[]>) {
            state.restaurants = action.payload;
        }
    }
});

export const { addRestaurantToStore, setRestaurants } = restaurantsSlice.actions;

export default restaurantsSlice.reducer;