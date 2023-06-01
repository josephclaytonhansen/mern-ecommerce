import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils'

const initialState = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : { cartItems: [] }

function addToCartHelper(state, action){
    const item = action.payload
    const inCart = state.cartItems.find((p) => p._id === item._id)

    if (inCart) {
        state.cartItems = state.cartItems.map((p) => p._id === inCart._id ? item : p)
    } else {
        state.cartItems = [...state.cartItems, item]
    }
    return updateCart(state)
    
}



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => addToCartHelper(state, action)
    }
})

export default cartSlice.reducer
export const { addToCart } = cartSlice.actions