import {createAsyncThunk} from '@reduxjs/toolkit'
const addr = "https://norma.nomoreparties.space/api/orders";
export const getOrderModal = createAsyncThunk(
    'order/getOrderModal',
    async (ingredients, {rejectWithValue}) => {
        try {

             const reqBody =  {
                 "ingredients": Array.from(ingredients).map(element => element._id).filter(id => id),
               }

            const res = await fetch(addr, {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody),
            });
            if (!res.ok) {
                return rejectWithValue('Ошибка создания заказа');
            } 
            const data = await res.json();
            return data.order;
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

