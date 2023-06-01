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


export const updateCart = (state) => {
    state.totalPrice = addDecimals(itemsPrice(state) + shippingPrice(state) + taxPrice(state))
    localStorage.setItem('cart', JSON.stringify(state))
    return state
}