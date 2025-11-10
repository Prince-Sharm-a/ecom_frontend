export const cartReducer = (state,{ type, payload }) =>{
    switch(type){
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, payload.product ]
            }
        case "REMOVE_FROM_CART":
            return {
                ...state, 
                cart: state.cart.filter(prd => prd.id !== payload)
            }
        case "MAKE_CART_EMPTY":
            return {
                ...state,
                cart:[]
            }
        default:
            return state
    }
}