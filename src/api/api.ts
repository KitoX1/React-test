import axios from "axios";

import { PATHS } from "../constants/paths";
import { REQUESTS } from "../constants/requests";
import { setAuth } from "../redux/slices/authSlice";
import { store } from "../redux/store";
import { IRestaurant, RestaurantsAPIType } from "../types/Restaurants";
import { IOrder, OrderAPIType } from "../types/Order";
import { AuthAPIType } from "../types/Auth";

const instance = axios.create({
    baseURL: REQUESTS.default,
});


instance.interceptors.request.use((config) => {
    (config.headers ??= {}).Authorization = `Bearer ${localStorage.getItem('fakeToken')}`;

    return config;
})

instance.interceptors.response.use((config) => {
    if ((config.config.headers ??= {}).Authorization !== "Bearer fakeHASH") { 
        store.dispatch(setAuth(false));
    }

    return config;
})


export const authAPI: AuthAPIType = {
    checkPhoneNumber(values) {
        if (values.phoneNumber === 9509998877) { 
            return true;
        } else {
            return false;
        }   
    },
    checkPhoneCode(values) {
        if (values.phoneCode === 1111) {
            return true;
        } else {
            return false;
        }
    }
}




export const restaurantsAPI: RestaurantsAPIType = {
    async getRestaurants() {
        const { data } = await instance.get<IRestaurant[]>(PATHS.restaurants);

        return data;
    },
    async addRestaurant(values) {
        const { data } = await instance.post<IRestaurant>(PATHS.restaurants, values);
        
        return data;
    }
} 

export const ordersAPI: OrderAPIType = {
    async getOrders(values) {
        const { data } = await instance.get<IOrder[]>(`${PATHS.restaurants}/${values.restaurantId}/orders?${values.filters}`);

        return data;
    }, 
    async addOrder(values) {
        const { data } = await instance.post<IOrder>(`${PATHS.restaurants}/${values.restaurantId}/orders`, values);

        return data;
    },
    async editOrder(values) {
        const { data } = await instance.patch<IOrder>(`orders/${values.id}`, values)

        return data;
    }   
}