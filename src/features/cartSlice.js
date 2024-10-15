import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.cartItems.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            } else {
                state.cartItems.push({...action.payload, quantity: 1});
            }

            state.totalAmount += action.payload.price;
        },
        removeFromCart: (state, action) => {
            const item = state.cartItems.find((item) => item.id === action.payload.id);
            if (item) {
              state.totalAmount -= item.price * item.quantity;
              state.cartItems = state.cartItems.filter((i) => i.id !== action.payload.id);
            }
        },
        updateQuantity: (state, action) => {
            const item = state.cartItems.find((item) => item.id === action.payload.id);
            if (item) {
              state.totalAmount += (action.payload.quantity - item.quantity) * item.price;
              item.quantity = action.payload.quantity;
            }
        }
    }
})

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;