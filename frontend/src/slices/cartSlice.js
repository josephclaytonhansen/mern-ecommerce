import { createSlice } from '@reduxjs/toolkit'
import { updateCart, addToCartHelper, removeFromCartHelper, saveShippingAddressHelper } from '../utils/cartUtils'

const initialState = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal'}



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => addToCartHelper(state, action),
        removeFromCart: (state, action) => removeFromCartHelper(state, action),
        saveShippingAddress: (state, action) => saveShippingAddressHelper(state, action),
    }
})

export default cartSlice.reducer
export const { addToCart, removeFromCart, saveShippingAddress } = cartSlice.actions