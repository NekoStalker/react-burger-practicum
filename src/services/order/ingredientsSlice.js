import {createAsyncThunkбcreateSlice} from '@reduxjs/toolkit'
import {fetchUserData } from ''

export const ingredientsSlice = createSlice({
    name: 'order',
    initialState: {
        createdOrder: {},
        loading: false,
        error: null
    },
    reducers: {
       
    }
});