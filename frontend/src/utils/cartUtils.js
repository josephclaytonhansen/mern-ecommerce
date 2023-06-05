export const addDecimals = (num) => {
    return Number((Math.round(num * 100) / 100).toFixed(2))
}

export function itemsPrice(state){
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0))
    return state.itemsPrice
}

//replace later with the ShipEngine API
export function shippingPrice(state){
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)
    return state.shippingPrice
}
//replace later with the Precisely API (https://developer.precisely.com/apis/localtax)
export function taxPrice(state){
    state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice))
    return state.taxPrice
}

export function addToCartHelper(state, action){
    const item = action.payload
    const inCart = state.cartItems.find((p) => p._id === item._id)

    if (inCart) {
        state.cartItems = state.cartItems.map((p) => p._id === inCart._id ? item : p)
    } else {
        state.cartItems = [...state.cartItems, item]
    }
    return updateCart(state)
    
}

export function removeFromCartHelper(state, action){
    state.cartItems = state.cartItems.filter((x)=> x._id !== action.payload)
    return updateCart(state)
}

export function saveShippingAddressHelper(state, action){
    state.shippingAddress = action.payload
    return updateCart(state)
}

export function savePaymentMethodHelper(state, action){
    state.paymentMethod = action.payload
    return updateCart(state)
}

export function clearCartHelper(state, action){
    state.cartItems = []
    return updateCart(state)
}

export const updateCart = (state) => {
    state.totalPrice = addDecimals(itemsPrice(state) + shippingPrice(state) + taxPrice(state))
    localStorage.setItem('cart', JSON.stringify(state))
    return state
}