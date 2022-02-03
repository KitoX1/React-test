import { createAsyncThunk, createSlice, PayloadAction  } from "@reduxjs/toolkit";

import { authAPI } from "../../api/api";
import { AuthInitialState, PhoneCodeRequestType, PhoneCodeResponseType, PhoneNumberRequestType, PhoneNumberResponseType } from "../../types/Auth";


export const checkPhoneNumber = createAsyncThunk(
    'auth/checkPhoneNumber',
    async function(values: PhoneNumberRequestType, { dispatch }) {
        try {
            const data: PhoneNumberResponseType = await authAPI.checkPhoneNumber(values);
            if (data) {
                dispatch(setPhoneNumber(data));
            } else {
                throw new Error('Неверный номер телефона');
            }

        } catch (error: any) {
            alert(error.message)
        }
    }
)

export const checkPhoneCode = createAsyncThunk(
    'auth/checkPhoneCode',
    async function(values: PhoneCodeRequestType, { dispatch }) {
        try {
            const data: PhoneCodeResponseType = await authAPI.checkPhoneCode(values);

            if (data) {
                localStorage.setItem('fakeToken', 'fakeHASH');
                dispatch(setAuth(true));
                dispatch(setPhoneNumber(false));
            } else {
                throw new Error('Неверный код');
            }

        } catch (error: any) {
            alert(error.message)
        }
    }
)


const initialState: AuthInitialState = {
    auth: true,
    phoneNumber: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<PhoneCodeResponseType>) {
            state.auth = action.payload;
        },
        setPhoneNumber(state, action: PayloadAction<PhoneNumberResponseType>) {
            state.phoneNumber = action.payload;
        }
    }
});

export const { setAuth, setPhoneNumber } = authSlice.actions;

export default authSlice.reducer;