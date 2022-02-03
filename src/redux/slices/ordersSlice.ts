import { createAsyncThunk, createSlice, PayloadAction  } from "@reduxjs/toolkit";

import { ordersAPI } from "../../api/api";
import { GetOrderType, IOrder, OrdersInitialState } from "../../types/Order";


export const getOrders = createAsyncThunk(
    'orders/getOrders',
    async function(values: GetOrderType, { dispatch }) {
        try {
            const data: IOrder[] = await ordersAPI.getOrders(values);

            dispatch(setOrders(data.reverse()));
            
        } catch (error) {
            error instanceof Error &&  alert(error.message)
        }
    }
)

export const addOrder = createAsyncThunk(
    'orders/addOrder',
    async function(values: IOrder, { dispatch }) {
        try {
            const data: IOrder = await ordersAPI.addOrder(values);
            
            dispatch(getOrders({ restaurantId: data.restaurantId, filters: localStorage.getItem('filter') || '' }));

        } catch (error) {
            error instanceof Error && alert(error.message)
        } 
    }
)

export const editOrder = createAsyncThunk(
    'orders/editOrder',
    async function(values: IOrder, { dispatch }) {
        try {
            const data: IOrder = await ordersAPI.editOrder(values);

            dispatch(editOrderInStore(data));

        } catch (error) {
            error instanceof Error &&  alert(error.message)
        } 
    }
)


const initialState: OrdersInitialState = {
    loadingInProgress: false,
    orders: [],
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrderToStore(state, action: PayloadAction<IOrder>) {
            state.orders.unshift(action.payload);     
        },
        editOrderInStore(state, action: PayloadAction<IOrder>) {
            state.orders = state.orders.map((order) => {
                if (order.id === action.payload.id) {
                    return action.payload;
                }
                return order;    
            })
        },
        setOrders(state, action: PayloadAction<IOrder[]>) {
            state.orders = action.payload;
        }
    },
    extraReducers: {
        [getOrders.pending.type]: (state) => {
            state.loadingInProgress = true;
        },
        [getOrders.fulfilled.type]: (state) => {
            state.loadingInProgress = false;
        },
        [getOrders.rejected.type]: (state) => {
            state.loadingInProgress = false;
        }
    }
});

export const { addOrderToStore, editOrderInStore, setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;