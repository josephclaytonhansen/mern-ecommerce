import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : { cartItems: [] }

const addDecimals = (num) => {
    return Number((Math.round(num * 100) / 100).toFixed(2))
}

function addToCartHelper(state, action){
    const item = action.payload
    const inCart = state.cartItems.find((p) => p._id === item._id)

    if (inCart) {
        state.cartItems = state.cartItems.map((p) => p._id === inCart._id ? item : p)
    } else {
        state.cartItems = [...state.cartItems, item]
    }
    state.totalPrice = addDecimals(itemsPrice(state) + shippingPrice(state) + taxPrice(state))

    localStorage.setItem('cart', JSON.stringify(state))

}

function itemsPrice(state){
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0))
    return state.itemsPrice
}

//replace later with the ShipEngine API
function shippingPrice(state){
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)
    return state.shippingPrice
}
//replace later with the Precisely API (https://developer.precisely.com/apis/localtax)
function taxPrice(state){
    state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice))
    return state.taxPrice
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