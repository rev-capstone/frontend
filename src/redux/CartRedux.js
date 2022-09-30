import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice ({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
    },
    reducers: {
        addProduct:(state, action) => {
            state.quantity += 1;
            state.products.push(action.payload.product);
        },
    },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;